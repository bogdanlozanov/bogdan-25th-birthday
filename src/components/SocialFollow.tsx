"use client";

import styled from "styled-components";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";

const socials = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@bogdanlozanov",
    Icon: FaYoutube,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@bogdanlozanov",
    Icon: FaTiktok,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/bogdan.lozanov/",
    Icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bogdan_lozanov/",
    Icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bogdan-lozanov-8aab41233/",
    Icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/bogdanlozanov",
    Icon: FaGithub,
  },
];

export default function SocialFollow() {
  return (
    <Wrapper aria-label="Социални мрежи">
      <Title>Искаш още готини проекти и видеа? Линкове към социалните ми мрежи.👇</Title>
      <IconRow>
        {socials.map(({ label, href, Icon }) => (
          <IconLink
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Следвай ме в ${label}`}
            title={label}
          >
            <Icon aria-hidden="true" />
          </IconLink>
        ))}
      </IconRow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
`;

const Title = styled.p`
  margin: 0;
  color: rgba(248, 246, 255, 0.75);
  font-size: 0.95rem;
`;

const IconRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

const IconLink = styled.a`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(125, 249, 255, 0.35);
  background: rgba(10, 14, 24, 0.45);
  color: rgba(125, 249, 255, 0.9);
  display: grid;
  place-items: center;
  transition: transform 0.2s ease, color 0.2s ease, border 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.15);
    color: #f4c95d;
    border-color: rgba(244, 201, 93, 0.6);
    box-shadow: 0 0 18px rgba(244, 201, 93, 0.35);
  }

  &:focus-visible {
    outline: 2px solid rgba(125, 249, 255, 0.8);
    outline-offset: 2px;
  }
`;
