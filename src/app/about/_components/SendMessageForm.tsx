"use client";

import { sendMessageAction } from "@/src/actions/message.actions";
import { Send } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

const SendMessageForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [flash, setFlash] = useState<null | {
    ok: boolean;
    error: string | null;
  }>(null);
  const [sendMessageState, sendMessageFormAction, isPending] = useActionState(
    sendMessageAction,
    null
  );

  useEffect(() => {
    if (!sendMessageState) return;

    if (sendMessageState.ok) {
      setFlash({ ok: true, error: null });
      setName("");
      setEmail("");
      setMessage("");

      const t = setTimeout(() => setFlash(null), 3000);
      return () => clearTimeout(t);
    } else {
      setFlash({ ok: false, error: sendMessageState.error });
    }
  }, [sendMessageState]);

  return (
    <section className="bg-green-8 py-16 md:py-24 px-4 md:px-12 lg:px-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brown-1 mb-4">
            Get in{" "}
            <span className="italic font-serif font-normal text-green-3">
              Touch
            </span>
          </h2>
          <p className="text-brown-1 text-base">
            Have questions or want to get involved? We'd love to hear from you.
            <br />
            Reach out to learn more about our work and how you can help.
          </p>
        </div>

        <form
          action={sendMessageFormAction}
          onChange={() => {
            if (flash?.ok === false) setFlash(null);
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-brown-1 text-sm font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan Dela Cruz"
                className="w-full px-4 py-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-4 text-green-8 placeholder:text-green-8/50"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-brown-1 text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juandelacruz@gmail.com"
                className="w-full px-4 py-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-4 text-green-8 placeholder:text-green-8/50"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-brown-1 text-sm font-semibold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Write your insight or suggestion..."
              className="w-full px-4 py-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-4 text-green-8 placeholder:text-green-8/50 resize-none"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-6 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-5 transition-colors inline-flex items-center gap-2"
              disabled={isPending}
            >
              {isPending ? "Sending..." : "Send a Message"}
              {!isPending && <Send className="w-4 h-4" />}
            </button>
          </div>

          {flash && (
            <p
              aria-live="polite"
              className={`text-sm font-semibold ${
                flash.ok ? "text-green-6" : "text-red-800"
              }`}
            >
              {flash.ok
                ? "Message sent successfully!"
                : `Error: ${flash.error || "Unknown error"}`}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default SendMessageForm;
