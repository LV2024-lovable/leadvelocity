
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const logos = [
  { src: "/lovable-uploads/fbd0c241-11ba-4470-8c27-861dabe3346f.png", alt: "Bleaze Logo" },
  { src: "/lovable-uploads/00aea08a-faf5-4686-b5ae-a3ab2ff9f1bc.png", alt: "Cape Logo" },
  { src: "/lovable-uploads/c2d9faa2-8034-4610-a27a-6fd02734f15c.png", alt: "Label None Logo" },
  { src: "/lovable-uploads/e513d424-0823-4316-bb35-4b63d6e4fcb5.png", alt: "Faslet Logo" },
  { src: "/lovable-uploads/5ceabc6f-e7d9-4ac1-a26a-b7e48ce81b30.png", alt: "Flik Flak Logo" },
  { src: "/lovable-uploads/f255f36a-88fe-4953-afdc-1d777f702c8d.png", alt: "Dome Logo" },
  { src: "/lovable-uploads/fb88f27c-e6e9-4826-b670-7352ee4dd795.png", alt: "Creative ICT Logo" },
  { src: "/lovable-uploads/18eefeaa-d49c-4419-a82f-7dca72a10fdd.png", alt: "Boest Logo" },
  { src: "/lovable-uploads/6a304e68-47f7-421c-8dca-3147de73818b.png", alt: "Solar Access Logo" },
  { src: "/lovable-uploads/eac464e7-2afd-4a98-83a2-3f64e0bc44b2.png", alt: "Cowboys Logo" },
  { src: "/lovable-uploads/99f1df2a-a39e-4678-b4c0-c841f7d351a5.png", alt: "Bleaze Alternative Logo" }
];

const LogoCarousel = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full py-8 overflow-hidden bg-velocity-gray">
      <Carousel className="w-full" opts={{ loop: true, align: "start", dragFree: true }}>
        <CarouselContent className={isMobile ? "animate-carousel-fast" : "animate-carousel"}>
          {[...logos, ...logos].map((logo, i) => (
            <CarouselItem key={i} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
              <div className="flex items-center justify-center h-40">
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="h-32 w-auto grayscale hover:grayscale-0 transition-all duration-300"
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
