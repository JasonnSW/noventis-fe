import { Divider } from "@/components/divider";
import { Section } from "@/components/section";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <section className="max-w-6xl mx-auto my-4">
      <div className="flex flex-col space-y-3">
        <CodeOfConductHeader />

        <Section title="Our Pledge" titleClass="mb-2">
          <CodeOfConductPledge />
        </Section>

        <Divider />

        <Section
          title="Our Standards"
          description="Examples of behavior that contributes to creating a positive environment include:
          "
          titleClass="mb-2"
        >
          <CodeOfConductStandard />
        </Section>

        <Divider />

        <Section title="Our Responsibilities" titleClass="mb-2">
          <CodeOfConductResponsibilities />
        </Section>

        <Divider />

        <Section title="Scope" titleClass="mb-2">
          <CodeOfConductScope />
        </Section>

        <Divider />

        <Section title="Enforcement">
          <CodeOfConductEnforcement />
        </Section>

        <Divider />

        <Section title="Attribution" titleClass="mb-2">
          <CodeOfConductAttribution />
        </Section>
      </div>
    </section>
  );
}

function CodeOfConductHeader() {
  return (
    <>
      <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-orbitron font-normal leading-normal">
        Code of Conduct
      </h3>

      <Divider />
    </>
  );
}

function CodeOfConductPledge() {
  return (
    <>
      <p className="font-openSans text-[#807F8C] text-sm md:text-base lg:text-lg leading-normal">
        In the interest of fostering an open and welcoming environment, we as
        contributors and maintainers pledge to make participation in our project
        and our community a harassment-free experience for everyone, regardless
        of age, body size, disability, ethnicity, sex characteristics, gender
        identity and expression, level of experience, education, socio-economic
        status, nationality, personal appearance, race, religion, or sexual
        identity and orientation.
      </p>
    </>
  );
}

function CodeOfConductStandard() {
  return (
    <>
      <ul className="list-disc list-outside pl-6 space-y-1 text-[#B2B1BD] font-openSans text-base lg:text-lg leading-normal mt-2">
        <li className="text-[#807F8C]">
          Using welcoming and inclusive language
        </li>
        <li className="text-[#807F8C]">
          Being respectful of differing viewpoints and experiences
        </li>
        <li className="text-[#807F8C]">
          Gracefully accepting constructive criticism
        </li>
        <li className="text-[#807F8C]">
          Focusing on what is best for the community
        </li>
        <li className="text-[#807F8C]">
          Focusing on what is best for the community
        </li>
        <li className="text-[#807F8C]">
          Showing empathy towards other community members
        </li>
      </ul>

      <h5 className="text-[#807F8C] font-openSans text-lg leading-normal my-4">
        Examples of unacceptable behavior by participants include:
      </h5>

      <ul className="list-disc list-outside pl-6 space-y-1 text-[#B2B1BD] font-openSans text-base lg:text-lg leading-normal mt-2">
        <li className="text-[#807F8C]">
          The use of sexualized language or imagery and unwelcome sexual
          attention or advances
        </li>
        <li className="text-[#807F8C]">
          Trolling, insulting/derogatory comments, and personal or political
          attacks
        </li>
        <li className="text-[#807F8C]">Public or private harassment</li>
        <li className="text-[#807F8C]">
          Publishing others' private information, such as a physical or
          electronic address, without explicit permission
        </li>
        <li className="text-[#807F8C]">
          Other conduct that could reasonably be considered inappropriate in a
          professional setting
        </li>
      </ul>
    </>
  );
}

function CodeOfConductResponsibilities() {
  return (
    <>
      <p className="font-openSans text-[#807F8C] text-sm md:text-base lg:text-lg leading-normal">
        In the interest of fostering an open and welcoming environment, we as
        contributors and maintainers pledge to make participation in our project
        and our community a harassment-free experience for everyone, regardless
        of age, body size, disability, ethnicity, sex characteristics, gender
        identity and expression, level of experience, education, socio-economic
        status, nationality, personal appearance, race, religion, or sexual
        identity and orientation.
      </p>
    </>
  );
}

function CodeOfConductScope() {
  return (
    <>
      <p className="font-openSans text-[#807F8C] text-sm md:text-base lg:text-lg leading-normal">
        This Code of Conduct applies both within project spaces and in public
        spaces when an individual is representing the project or its community.
        Examples of representing a project or community include using an
        official project e-mail address, posting via an official social media
        account, or acting as an appointed representative at an online or
        offline event. Representation of a project may be further defined and
        clarified by project maintainers.
      </p>
    </>
  );
}

function CodeOfConductEnforcement() {
  return (
    <>
      <div className="my-4">
        <p className="font-openSans text-[#807F8C] text-sm md:text-base lg:text-lg leading-normal">
          Instances of abusive, harassing, or otherwise unacceptable behavior
          may be reported by contacting the project team at
          noventis.bccfilkom@gmail.com. All complaints will be reviewed and
          investigated and will result in a response that is deemed necessary
          and appropriate to the circumstances. The project team is obligated to
          maintain confidentiality with regard to the reporter of an incident.
          Further details of specific enforcement policies may be posted
          separately.
        </p>
        <p className="font-openSans text-[#807F8C] text-sm md:text-base lg:text-lg leading-normal">
          Instances of abusive, harassing, or otherwise unacceptable behavior
          may be reported by contacting the project team at
          noventis.bccfilkom@gmail.com. All complaints will be reviewed and
          investigated and will result in a response that is deemed necessary
          and appropriate to the circumstances. The project team is obligated to
          maintain confidentiality with regard to the reporter of an incident.
          Further details of specific enforcement policies may be posted
          separately.
        </p>
      </div>
    </>
  );
}

function CodeOfConductAttribution() {
  return (
    <p className="font-openSans text-[#807F8C] text-sm md:text-base lg:text-lg leading-normal">
      This Code of Conduct is adapted from the{" "}
      <a
        href="https://www.contributor-covenant.org/version/1/4/code-of-conduct.html"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#FF6849] underline underline-offset-[2px] font-bold"
      >
        Contributor Covenant
      </a>
      , version 1.4, available at{" "}
      <a
        href="https://www.contributor-covenant.org/version/1/4/code-of-conduct.html"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#FF6849] underline underline-offset-[2px] font-bold"
      >
        https://www.contributor-covenant.org/version/1/4/code-of-conduct.html
      </a>
    </p>
  );
}
