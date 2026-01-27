import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PhoneInput from "react-phone-input-2";
import { Button, RotatingIcon } from "@/components/ui/button";
import { ArrowRightSVG } from "@/assets/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInView } from "@/hooks/useInView";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import "react-phone-input-2/lib/style.css";
import FAQ from "@/components/FAQ";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser"; // Import EmailJS

// Updated form schema to make phone and source optional
const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(), // Made optional
  source: z.string().optional(), // Made optional
  message: z
    .string()
    .min(2, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

// EmailJS configuration - replace with your actual IDs
const EMAILJS_SERVICE_ID = "service_ytteklz";
const EMAILJS_TEMPLATE_ID = "template_6dr5yvp";
const EMAILJS_PUBLIC_KEY = "IEmeJ5e8HtipqemG7";

const ContactUs = () => {
  const [containerRef, isInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const location = useLocation();

  const [submitting, setSubmitting] = useState(false);
  const [styleAdded, setStyleAdded] = useState(false);

  useEffect(() => {
    // Always scroll to top when component mounts or when location changes
    window.scrollTo(0, 0);

    if (!styleAdded) {
      const style = document.createElement("style");
      style.innerHTML = `
      .custom-phone-dropdown .country-list .country:hover {
        background-color: rgba(255, 255, 255, 0.1) !important;
        color: #bbf298 !important; 
      }

      .custom-phone-dropdown .country-list .highlight {
        background-color: #2C3E50 !important; /* Dark blue background */
        color: #61DAFB !important; /* Same light blue as hover */
      }

      .react-tel-input .flag-dropdown:hover,
      .react-tel-input .selected-flag:hover,
      .custom-phone-dropdown .react-tel-input .selected-flag:hover,
      .custom-phone-dropdown .flag-dropdown button:hover,
      .custom-phone-dropdown .selected-flag:hover {
        background-color: transparent !important;
      }
      
      .react-tel-input .flag-dropdown button:hover {
        background-color: transparent !important;
      }
    `;
      document.head.appendChild(style);
      setStyleAdded(true);
    }
  }, [styleAdded, location]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      source: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);

    try {
      // Prepare the template parameters
      const templateParams = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || "Not provided",
        source: data.source || "Not specified",
        message: data.message,
        submit_date: new Date().toLocaleString(),
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent successfully:", result.text);
      toast.success("Your message has been sent! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Failed to send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  return (
    <>
      <Navbar />
      <section className="bg-bgPrimary">
        <div
          className={cn(
            " pb-side-spacing pt-[218px] max-w-[1440px] mx-auto overflow-hidden",
            "px-side-spacing-mobile md:px-side-spacing-tablet "
          )}
        >
          <div className="xl:relative  grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start  overflow-hidden">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h1 className="font-kanit font-bold text-boneWhite !text-h1 lg:text-banner">
                  Let's <span className="text-primary-100">talk.</span>
                </h1>
                <p className="text-body-lg text-textBody mt-4">
                  Drop us a message below. No fluff, no forms disappearing into
                  the void. We'll get back to you asap. If you want to jump on a
                  free call, just check the box, and we'll make it happen.
                </p>
                <p className="text-body-sm-medium text-textBody mt-8 mb-4">
                  Don't be shy - it's free!
                </p>
                <Button
                  variant="default"
                  size="md"
                  onClick={() =>
                    window.open(
                      "https://calendly.com/pod21/discoverycall",
                      "_blank"
                    )
                  }
                >
                  Book a free call now
                  <RotatingIcon>
                    <ArrowRightSVG width={14} height={10} />
                  </RotatingIcon>
                </Button>
                <div
                  className={cn(
                    "absolute -left-[100px] -bottom-9 w-[720px] h-[620px]",
                    "hidden lg:block"
                  )}
                >
                  <img
                    src="/tilt-arrow-lines.png"
                    alt="Background pattern"
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            </div>
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={cn(
                "bg-bgSecondary rounded-xl border border-none p-8",
                "!bg-opacity-100" // Force 100% opacity on all screen sizes
              )}
              style={{ backgroundColor: "var(--bg-secondary)" }} // Adding a direct style for more specificity
            >
              <h4 className="text-h4 text-boneWhite">Drop us a message</h4>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 mt-8"
                >
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-boneWhite">
                          Enter your full name{" "}
                          <span className="text-primary-100">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                            className="bg-bgPrimary text-boneWhite text-body-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-boneWhite">
                          Enter your email address{" "}
                          <span className="text-primary-100">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@example.com"
                            type="email"
                            {...field}
                            className="bg-bgPrimary border-stroke text-boneWhite"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel className="text-boneWhite">
                          Enter contact number
                        </FormLabel>
                        <FormControl>
                          <PhoneInput
                            country={"us"}
                            value={value}
                            onChange={onChange}
                            inputProps={{
                              ...field,
                              className:
                                "!text-boneWhite !text-body-lg rounded-full border border-input border-stroke bg-bgPrimary !px-24 py-4 w-full",
                            }}
                            inputClass=""
                            containerClass="!w-full custom-phone-dropdown"
                            buttonClass="!bg-bgPrimary !border-stroke !rounded-l-full w-20 flex items-center justify-center"
                            dropdownClass="!bg-bgSecondary !text-boneWhite !rounded-xl !p-4"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-boneWhite">
                          Where did you hear about pod21?
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-bgPrimary border-stroke text-boneWhite">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-bgSecondary border-stroke text-boneWhite">
                            <SelectItem value="google">Google</SelectItem>
                            <SelectItem value="social">Social Media</SelectItem>
                            <SelectItem value="friend">
                              Friend Referral
                            </SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-boneWhite">
                          Message <span className="text-primary-100">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us what you're looking for..."
                            {...field}
                            className="bg-bgPrimary border-stroke text-boneWhite min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center !mt-10">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={submitting}
                    >
                      {submitting ? "Sending..." : "Send your message"}
                      <RotatingIcon>
                        <ArrowRightSVG />
                      </RotatingIcon>
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </>
  );
};

export default ContactUs;
