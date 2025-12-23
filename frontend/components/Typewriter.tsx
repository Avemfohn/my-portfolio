"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export interface TypewriterProps {
  texts: string[];
  delay?: number;
  baseText?: string;
}

export default function Typewriter({ texts, delay = 0, baseText = "" }: TypewriterProps) {
  const textIndex = useMotionValue(0);

  // The base text to display before the typewriter effect
  const baseTextDisplay = useTransform(textIndex, (latest) => {
    const updatedLatest = Math.round(latest);
    const currentTextIndex = updatedLatest % texts.length; // Modulo for looping
    const currentText = texts[currentTextIndex];
    return baseText + currentText; // If needed, can use baseText here
  });

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => {
    // Find current text based on textIndex
    const currentTextIndex = textIndex.get() % texts.length;
    const fullText = texts[currentTextIndex];
    return fullText.slice(0, latest); // Show character by character
  });

  useEffect(() => {
    const controls = animate(count, 60, { // 60 character buffer
      type: "tween",
      duration: 2,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1,
      onUpdate(latest) {
        // When text is deleted (animation reverse finished), move to the next word
        if (latest <= 0) {
          const prev = textIndex.get();
          // Only increase index when it's an integer to avoid continuous rendering
           if (prev === textIndex.get()) {
             textIndex.set(prev + 1);
           }
        }
      }
    });
    return controls.stop;
  }, []);

  // Simple solution: Framer Motion hooks can sometimes get complicated.
  // The above motion value logic can be replaced with this cleaner approach:

  return <TypewriterEffect texts={texts} />;
}

function TypewriterEffect({ texts }: { texts: string[] }) {
  const [displayedText, setDisplayedText] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [reverse, setReverse] = React.useState(false);
  const [blink, setBlink] = React.useState(true);

  //Effect for blinking cursor
  React.useEffect(() => {
    const timeout2 = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(timeout2);
  }, []);

  // Typing / Deleting Logic
  React.useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000); // Wait when word is finished
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length); // Move to the next word
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === texts[index].length ? 1000 : 150, parseInt((Math.random() * 350).toString())));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  return (
    <span>
      {texts[index].substring(0, subIndex)}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-[1em] bg-blue-400 ml-1 align-middle"
      />
    </span>
  );
}

import React from "react";