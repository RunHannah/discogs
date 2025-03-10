import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";

interface GridProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export default function Grid({ isLoading, children }: GridProps) {
  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center"
      variants={gridVariants}
      initial="hidden"
      animate="show"
    >
      {isLoading
        ? Array.from({ length: 25 }).map((_, index) => <Skeleton key={index} />)
        : children}
    </motion.div>
  );
}
