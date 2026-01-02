
import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { BlogPost } from '../types';

interface GraphViewProps {
  posts: BlogPost[];
  onNavigate: (postId: string) => void;
  onTagFilter: (tag: string) => void;
  compact?: boolean;
}

const GraphView: React.FC<GraphViewProps> = ({ posts, onNavigate, onTagFilter, compact = false }) => {
  const fgRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: compact ? 350 : 600 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: compact ? 350 : 600
        });
      }
    };
    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    updateSize();
    return () => resizeObserver.disconnect();
  }, [compact]);

  useEffect(() => {
    if (fgRef.current) {
      setTimeout(() => {
        fgRef.current.zoomToFit(400, 50);
      }, 200);
    }
  }, [posts, dimensions]);

  const graphData = useMemo(() => {
    const nodesMap = new Map<string, any>();
    const links: any[] = [];

    posts.forEach(post => {
      post.tags.forEach(tagPath => {
        const parts = tagPath.split('/');
        
        parts.forEach((part, index) => {
          // Node ekle
          if (!nodesMap.has(part)) {
            nodesMap.set(part, { 
              id: part, 
              name: part, 
              fullTag: part, // Tıklanınca neyi aratacağız?
              val: 2 + (parts.length - index) // Kök düğümler biraz daha büyük olabilir
            });
          }

          // Link ekle (önceki parça ile bağ kur)
          if (index > 0) {
            const source = parts[index - 1];
            const target = part;
            const linkId = `${source}-${target}`;
            
            if (!links.some(l => l.id === linkId)) {
              links.push({ id: linkId, source, target });
            }
          }
        });
      });
    });

    return { 
      nodes: Array.from(nodesMap.values()), 
      links 
    };
  }, [posts]);

  const handleNodeClick = useCallback((node: any) => {
    // Etikete tıklandığında filtrele
    onTagFilter(node.id);
  }, [onTagFilter]);

  const nodeCanvasObject = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.name;
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    
    // Düğüm dairesi
    const r = node.val / (compact ? 1.5 : 1);
    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
    
    // Hiyerarşi derinliğine göre renk tonu (Opsiyonel)
    ctx.fillStyle = '#3b82f6';
    ctx.fill();

    // Etiket metni
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#1e293b';
    ctx.fillText(label, node.x, node.y + r + fontSize * 0.8);
  }, [compact]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full ${compact ? 'h-[350px]' : 'h-[600px]'} bg-gray-50 overflow-hidden relative force-graph-container`}
    >
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Etiket Ağı (Hiyerarşik)
        </h3>
      </div>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeCanvasObject={nodeCanvasObject}
        nodeCanvasObjectMode={() => 'replace'}
        linkDirectionalArrowLength={3}
        linkDirectionalArrowRelPos={1}
        linkColor={() => '#cbd5e1'}
        onNodeClick={handleNodeClick}
        backgroundColor="#ffffff"
        cooldownTicks={100}
        width={dimensions.width} 
        height={dimensions.height}
      />
    </div>
  );
};

export default GraphView;
