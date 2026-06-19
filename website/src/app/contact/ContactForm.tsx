"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import { fromParam, prefillPhrases } from "@/data/dragCheck";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const fieldClasses = (hasError: boolean) =>
  `w-full px-4 py-3 bg-well border rounded-inset font-mono text-tele text-fg placeholder:text-dim focus:outline-none focus:ring-2 focus:ring-amber/50 transition-all ${
    hasError ? "border-alert" : "border-line"
  }`;

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const searchParams = useSearchParams();

  // Prefill from a drag check profile (/contact?dc=F01,F05): the owner
  // gets intel before the call.
  useEffect(() => {
    const flagged = fromParam(searchParams.get("dc"));
    if (flagged.length === 0) return;
    const phrases = flagged.map((id) => prefillPhrases[id]).join("; ");
    setFormData((prev) =>
      prev.message
        ? prev
        : {
            ...prev,
            message: `Ran the drag check. Flagged: ${phrases}. Tell me what an engine for this looks like.`,
          }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-line rounded-inset p-8 text-center bg-well"
      >
        <CheckCircle className="w-10 h-10 text-ok mx-auto mb-4" />
        <h3 className="font-display font-bold text-heading text-fg mb-2">
          Message sent
        </h3>
        <p className="font-mono text-tele text-mute mb-6">
          ✓ received. we will be in touch within 24 hours.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 border border-alert/50 rounded-inset bg-alert/5"
          >
            <AlertCircle className="w-5 h-5 text-alert flex-shrink-0" />
            <p className="font-mono text-tele text-alert">
              Something went wrong. Please try again.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <label htmlFor="name" className="block font-mono text-tele-sm uppercase text-steel/80 mb-2">
          name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={fieldClasses(!!errors.name)}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1 font-mono text-tele text-alert">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block font-mono text-tele-sm uppercase text-steel/80 mb-2">
          email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={fieldClasses(!!errors.email)}
          placeholder="you@company.com"
        />
        {errors.email && (
          <p className="mt-1 font-mono text-tele text-alert">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="company" className="block font-mono text-tele-sm uppercase text-steel/80 mb-2">
          company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={fieldClasses(!!errors.company)}
          placeholder="Your company"
        />
        {errors.company && (
          <p className="mt-1 font-mono text-tele text-alert">{errors.company}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-tele-sm uppercase text-steel/80 mb-2">
          message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={`${fieldClasses(!!errors.message)} resize-none`}
          placeholder="Tell us about your operation and the process that hurts the most..."
        />
        {errors.message && (
          <p className="mt-1 font-mono text-tele text-alert">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        disabled={status === "submitting"}
        className="w-full justify-center"
        data-tracking="contact-form-submit"
      >
        {status === "submitting" ? "Sending..." : "Send message →"}
      </Button>
    </form>
  );
}
