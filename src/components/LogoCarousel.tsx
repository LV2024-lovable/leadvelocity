
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const logos = [
  { src: "/lovable-uploads/6162ffe3-f10a-4dc9-836d-391e82e4579e.png", alt: "First Logo" },
  { src: "/lovable-uploads/b88d7723-4aa4-407f-b980-e0f79df261c8.png", alt: "Second Logo" },
  { src: "/lovable-uploads/2b5e6463-7d73-4720-99b9-433e23abaeb1.png", alt: "Third Logo" },
  { src: "/lovable-uploads/7918a5b9-7449-4de8-b1db-495daf9c4115.png", alt: "Fourth Logo" }
];

const LogoCarousel = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full py-16 overflow-hidden bg-velocity-gray">
      <Carousel className="w-full" opts={{ loop: true, align: "start", dragFree: true }}>
        <CarouselContent className={isMobile ? "animate-carousel-fast" : "animate-carousel"}>
          {[...logos, ...logos].map((logo, i) => (
            <CarouselItem key={i} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
              <div className="flex items-center justify-center h-[200px]">
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="max-h-[200px] w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
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
