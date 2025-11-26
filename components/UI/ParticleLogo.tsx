import React, { useEffect, useRef } from 'react';

export const ParticleLogo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

// --- Configuration ---
const config = {
  particles: {
    array: [] as any[],
    detail: 1,          // 1 = Highest quality (scans every pixel row defined by step)
    // color: '#d4af37', // REMOVED: We now use the pixel's actual color
    size: {
      value: 2,         
      random: false
    },
    movement: {
      speed: 1,
      restless: {
        enabled: false,
        value: 10,
        sync: false
      }
    },
    interactivity: {
      on_hover: {
        enabled: true,
        action: 'repulse'
      },
      on_click: {
        enabled: true,
        action: 'big_repulse'
      },
      fn_array: [] as Function[]
    }
  },
  image: {
    src: {
      path: "https://res.cloudinary.com/dhpqnaqgd/image/upload/v1764060858/cropped-logo_tawe2x.png", // Uses the constant defined at the top
      fallback: "/logo.png",
      demo: "https://images.unsplash.com/photo-1621261266833-66023848b873?q=80&w=500&auto=format&fit=crop"
    },
    size: {
      canvas_pct: 60, 
      min_px: 100,
      max_px: 800
    },
    obj: new Image(),
    aspect_ratio: 1,
    x: 0,
    y: 0
  },
  interactions: {
    repulse: {
      distance: 100,
      strength: 200
    },
    big_repulse: {
      distance: 300,
      strength: 250
    },
    grab: {
      distance: 100,
      line_width: 1
    }
  },
  canvas: {
    w: 0,
    h: 0,
    context: canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D
  },
  mouse: {
    x: null as number | null,
    y: null as number | null,
    click_x: null as number | null,
    click_y: null as number | null
  }
};

// --- Helper Utils ---
const randIntInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);
const debounce = (func: Function, min_interval: number) => {
  let timer: any;
  return function(event: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, min_interval, event);
  };
};

// --- Particle Class ---
class SingleImageParticle {
  x: number;
  y: number;
  dest_x: number;
  dest_y: number;
  vx: number;
  vy: number;
  acc_x: number;
  acc_y: number;
  friction: number;
  restlessness: any;
  color: string;
  size: number;

  constructor(init_xy: { x: number, y: number }, dest_xy: { x: number, y: number }, color: string) {
    this.x = init_xy.x;
    this.y = init_xy.y;
    this.dest_x = dest_xy.x;
    this.dest_y = dest_xy.y;
    this.vx = (Math.random() - 0.5) * config.particles.movement.speed;
    this.vy = (Math.random() - 0.5) * config.particles.movement.speed;
    this.acc_x = 0;
    this.acc_y = 0;
    this.friction = Math.random() * 0.01 + 0.92;
    this.restlessness = {
      max_displacement: Math.ceil(Math.random() * config.particles.movement.restless.value),
      x_jitter: randIntInRange(-3, 3),
      y_jitter: randIntInRange(-3, 3),
      on_curr_frame: false
    };
    this.color = color; // CRITICAL: Use the color passed from the image pixel
    this.size = Math.round((config.particles.size.random ? Math.max(Math.random(), 0.5) : 1) * config.particles.size.value);
  }

  draw() {
    config.canvas.context.fillStyle = this.color;
    config.canvas.context.fillRect(this.x, this.y, this.size, this.size);
  }
}

// --- Canvas Functions ---
const canvasFuncs = {
  init: () => {
    config.canvas.w = canvas.offsetWidth;
    config.canvas.h = canvas.offsetHeight;
    canvas.width = config.canvas.w;
    canvas.height = config.canvas.h;
    window.addEventListener('resize', debounce(canvasFuncs.onResize, 200));
  },
  onResize: () => {
    config.canvas.w = canvas.offsetWidth;
    config.canvas.h = canvas.offsetHeight;
    canvas.width = config.canvas.w;
    canvas.height = config.canvas.h;
    config.particles.array = [];
    imageFuncs.resize();
    const image_pixels = canvasFuncs.getImagePixels();
    if (image_pixels) {
      particleFuncs.createImageParticles(image_pixels, true);
    }
  },
  clear: () => {
    config.canvas.context.clearRect(0, 0, config.canvas.w, config.canvas.h);
  },
  getImagePixels: () => {
    if (!config.image.obj.complete || config.image.obj.naturalWidth === 0) return null;
    canvasFuncs.clear();
    try {
      config.canvas.context.drawImage(config.image.obj, config.image.x, config.image.y, config.image.obj.width, config.image.obj.height);
      const pixel_data = config.canvas.context.getImageData(config.image.x, config.image.y, config.image.obj.width, config.image.obj.height);
      canvasFuncs.clear();
      return pixel_data;
    } catch (e) {
      console.error("Canvas Security Error:", e);
      return null;
    }
  }
};

// --- Image Functions ---
const imageFuncs = {
  resize: () => {
    const image_aspect = config.image.obj.width / config.image.obj.height;
    const canvas_aspect = config.canvas.w / config.canvas.h;
    
    if (image_aspect < canvas_aspect) {
      config.image.obj.height = clamp(Math.round(config.canvas.h * config.image.size.canvas_pct / 100), config.image.size.min_px, config.image.size.max_px);
      config.image.obj.width = Math.round(config.image.obj.height * image_aspect);
    } else {
      config.image.obj.width = clamp(Math.round(config.canvas.w * config.image.size.canvas_pct / 100), config.image.size.min_px, config.image.size.max_px);
      config.image.obj.height = Math.round(config.image.obj.width / image_aspect);
    }
    
    config.image.x = config.canvas.w / 2 - config.image.obj.width / 2;
    // Position logo at 20% from top
    config.image.y = (config.canvas.h * 0.30) - (config.image.obj.height / 2);
  },
  init: () => {
    // Fallback Chain
    const sources = [
        config.image.src.path, // Try User-Provided Path
        config.image.src.fallback, // Try Root
        config.image.src.demo // Try Demo
    ];
    let currentSourceIndex = 0;

    const loadNextSource = () => {
        if (currentSourceIndex >= sources.length) {
            console.warn("All image sources failed.");
            return;
        }

        const source = sources[currentSourceIndex];
        config.image.obj.crossOrigin = "anonymous";
        config.image.obj.src = source;
        currentSourceIndex++;
    };
    
    config.image.obj.onerror = () => {
      loadNextSource();
    };

    config.image.obj.onload = () => {
      imageFuncs.resize();
      const img_pixels = canvasFuncs.getImagePixels();
      if (img_pixels) {
        particleFuncs.createImageParticles(img_pixels);
        particleFuncs.animateParticles();
      }
    };

    loadNextSource();
  }
};

// --- Particle Logic ---
const particleFuncs = {
  createImageParticles: (pixel_data: ImageData, at_dest = false) => {
    if (!pixel_data || pixel_data.width === 0) return;
    
    const increment = config.particles.detail;
    const step = 4; // Horizontal/Vertical skip step to create grid effect and save perf

    for (let i = 0; i < pixel_data.width; i += step) {
      for (let j = 0; j < pixel_data.height; j += step) {
        // Pixel index in the 1D array (r, g, b, a)
        const index = (i + j * pixel_data.width) * 4;
        
        // Check alpha channel (> 128 means visible pixel)
        if (pixel_data.data[index + 3] > 128) {
          // CRITICAL: Extract color from pixel data
          const r = pixel_data.data[index];
          const g = pixel_data.data[index + 1];
          const b = pixel_data.data[index + 2];
          const color = `rgb(${r},${g},${b})`;

          const dest_xy = { x: config.image.x + i, y: config.image.y + j };
          const init_xy = at_dest ? dest_xy : { x: Math.random() * config.canvas.w, y: Math.random() * config.canvas.h };
          
          config.particles.array.push(new SingleImageParticle(init_xy, dest_xy, color));
        }
      }
    }
  },
  updateParticles: () => {
    for (let p of config.particles.array) {
      if ((config.particles.movement.restless.enabled) && (p.restlessness.on_curr_frame)) {
        p.x += p.restlessness.x_jitter;
        p.y += p.restlessness.y_jitter;
        if (Math.sqrt((p.dest_x - p.x) ** 2 + (p.dest_y - p.y) ** 2) >= config.particles.movement.restless.value) {
          p.restlessness.on_curr_frame = false;
        }
      } else {
        p.acc_x = (p.dest_x - p.x) / 500;
        p.acc_y = (p.dest_y - p.y) / 500;
        p.vx = (p.vx + p.acc_x) * p.friction;
        p.vy = (p.vy + p.acc_y) * p.friction;
        p.x += p.vx;
        p.y += p.vy;
      }
      interactivityFuncs.interact(p);
    }
  },
  animateParticles: () => {
    canvasFuncs.clear();
    particleFuncs.updateParticles();
    for (let p of config.particles.array) {
      p.draw();
    }
    animationRef.current = requestAnimationFrame(particleFuncs.animateParticles);
  }
};

// --- Interaction Logic ---
const interactivityFuncs = {
  repulseParticle: (p: any, args: any) => {
    if (config.mouse.x === null || config.mouse.y === null) return;
    const dx = p.x - config.mouse.x;
    const dy = p.y - config.mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const inv_strength = clamp(300 - args.strength, 10, 300);
    
    if (dist <= args.distance) {
      p.acc_x = (p.x - config.mouse.x) / inv_strength;
      p.acc_y = (p.y - config.mouse.y) / inv_strength;
      p.vx += p.acc_x;
      p.vy += p.acc_y;
    }
  },
  interact: (p: any) => {
    for (let func of config.particles.interactivity.fn_array) {
      func(p);
    }
  },
  setup: () => {
    const map = {
      'repulse': interactivityFuncs.repulseParticle,
      'big_repulse': interactivityFuncs.repulseParticle
    };

    if (config.particles.interactivity.on_hover.enabled) {
      const action = config.particles.interactivity.on_hover.action as 'repulse';
      config.particles.interactivity.fn_array.push((p: any) => 
        map[action](p, config.interactions[action])
      );
    }
    if (config.particles.interactivity.on_click.enabled) {
      const action = config.particles.interactivity.on_click.action as 'big_repulse';
       config.particles.interactivity.fn_array.push((p: any) => {
           if (config.mouse.click_x !== null) {
                map[action](p, config.interactions[action]);
           }
       });
    }
  }
};

// --- Launch ---
const initInteractions = () => {
  const onMove = (e: MouseEvent) => {
    config.mouse.x = e.offsetX || e.clientX;
    config.mouse.y = e.offsetY || e.clientY;
  };
  const onLeave = () => {
    config.mouse.x = null;
    config.mouse.y = null;
  };
  const onDown = () => {
    config.mouse.click_x = config.mouse.x;
    config.mouse.click_y = config.mouse.y;
  };
  const onUp = () => {
    config.mouse.click_x = null;
    config.mouse.click_y = null;
  };

  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('mouseleave', onLeave);
  canvas.addEventListener('mousedown', onDown);
  canvas.addEventListener('mouseup', onUp);

  return () => {
    canvas.removeEventListener('mousemove', onMove);
    canvas.removeEventListener('mouseleave', onLeave);
    canvas.removeEventListener('mousedown', onDown);
    canvas.removeEventListener('mouseup', onUp);
  };
};

canvasFuncs.init();
interactivityFuncs.setup();
const removeListeners = initInteractions();
imageFuncs.init();

return () => {
  cancelAnimationFrame(animationRef.current);
  window.removeEventListener('resize', canvasFuncs.onResize);
  removeListeners();
};

  }, []);

  return (
    <div id="particle-image-container" className="absolute inset-0 w-full h-full pointer-events-none z-10">
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'auto' }}
      />
    </div>
  );
};