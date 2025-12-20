
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export const siteConfig = {
    name: "Emirhan",
    description: "Personal portfolio showcasing my projects and skills.",
    url: "https://emirhan.cv",
    links: {
        github: "https://github.com/xrenata",
        linkedin: "https://linkedin.com/in/xrenata",
        email: "mailto:mail@emirhan.cv",
        twitter: "https://twitter.com/emirhan"
    }
}

export const routes = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
]

export const socialLinks = [
    {
        name: "GitHub",
        href: siteConfig.links.github,
        icon: Github
    },
    {
        name: "LinkedIn",
        href: siteConfig.links.linkedin,
        icon: Linkedin
    },
    {
        name: "Email",
        href: siteConfig.links.email,
        icon: Mail
    }
]
