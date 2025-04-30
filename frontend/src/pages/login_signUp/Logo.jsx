"use client";
import React from "react";

const Logo = () => {
  return (
    <svg
      width="195"
      height="47"
      viewBox="0 0 195 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logo"
    >
      <g filter="url(#filter0_d_410_2041)">
        <text
          fill="white"
          xmlSpace="preserve"
          style={{ whiteSpace: "pre" }}
          fontFamily="Inter"
          fontSize="24"
          fontWeight="bold"
          letterSpacing="0em"
        >
          <tspan x="62.9961" y="34.2969">
            OVIESYNC
          </tspan>
        </text>
        <text
          fill="#EE0D0D"
          xmlSpace="preserve"
          style={{ whiteSpace: "pre" }}
          fontFamily="Asset"
          fontSize="32"
          letterSpacing="0em"
        >
          <tspan x="6.02734" y="34.2969">
            M
          </tspan>
        </text>
      </g>
      <mask
        id="mask0_410_2041"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="67"
        y="21"
        width="10"
        height="10"
      >
        <rect x="67" y="21" width="10" height="10" fill="#D9D9D9"></rect>
      </mask>
      <g mask="url(#mask0_410_2041)">
        <path
          d="M70.334 28.9166V23.0833L74.9173 25.9999L70.334 28.9166Z"
          fill="white"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_410_2041"
          x="3.37109"
          y="14.3281"
          width="188.473"
          height="28.7344"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          ></feColorMatrix>
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_410_2041"
          ></feBlend>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_410_2041"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
};

export default Logo;
