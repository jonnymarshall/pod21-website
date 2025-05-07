import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightSVG } from "@/assets/icons";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  image: string;
  summary: string;
  category?: string;
  className?: string;
  slug?: string;
  disabled?: boolean;
}

const BlogCard = ({
  title,
  image,
  summary,
  disabled,
  className,
  slug,
}: BlogCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;
    if (slug) {
      navigate(`/blog/${slug}`);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "group h-full cursor-pointer flex flex-col  rounded-xl p-4 overflow-hidden",
        "hover:border hover:border-textBody hover:bg-bgSecondary",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full rounded-lg overflow-hidden",
          "h-[180px] md:h-[140px]"
        )}
      >
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col flex-1 mt-6">
        <p className="text-boneWhite text-body-lg-medium">{title}</p>

        <p className="text-textBody text-body-sm mt-2 flex-1 line-clamp-3">
          {summary}
        </p>

        <Link to={slug ? `/blog/${slug}` : "#"} className="mt-auto">
          <button
            disabled={disabled}
            className={
              "flex items-center gap-3 !text-primary-100 text-body-sm hover:text-boneWhite transition-colors mt-8 group-hover:!text-primary-60"
            }
          >
            Read more{" "}
            <ArrowRightSVG className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
