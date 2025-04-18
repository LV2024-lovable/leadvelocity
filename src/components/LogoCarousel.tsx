
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface LogoCarouselProps {
  className?: string;
  containerClassName?: string;
  logoWidth?: number;
  logoHeight?: number;
}

const logos = [
  { src: "/lovable-uploads/6162ffe3-f10a-4dc9-836d-391e82e4579e.png", alt: "First Logo" },
  { src: "/lovable-uploads/b88d7723-4aa4-407f-b980-e0f79df261c8.png", alt: "Second Logo" },
  { src: "/lovable-uploads/7918a5b9-7449-4de8-b1db-495daf9c4115.png", alt: "Third Logo" },
  { src: "/lovable-uploads/494a5ddf-b911-4cc3-8999-ba1c54d2fca5.png", alt: "Fourth Logo" },
  { src: "/lovable-uploads/98adbd3c-7b48-409d-a871-c6da7dfa86ba.png", alt: "Fifth Logo" }
];

const LogoCarousel = ({ 
  className,
  containerClassName,
  logoWidth = 225,
  logoHeight = 120
}: LogoCarouselProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn("w-full py-16 overflow-hidden bg-velocity-gray", containerClassName)}>
      <Carousel 
        className={cn("w-full", className)} 
        opts={{ 
          loop: true, 
          align: "center",
          dragFree: true,
        }}
      >
        <CarouselContent className={cn(
          isMobile ? "animate-carousel-fast" : "animate-carousel",
          "-ml-4 gap-4"
        )}>
          {[...logos, ...logos].map((logo, i) => (
            <CarouselItem 
              key={i} 
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 flex-grow-0"
            >
              <div className="flex items-center justify-center px-4">
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  width={logoWidth}
                  height={logoHeight}
                  style={{
                    width: logoWidth,
                    height: logoHeight,
                    objectFit: 'contain'
                  }}
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default LogoCarousel;
