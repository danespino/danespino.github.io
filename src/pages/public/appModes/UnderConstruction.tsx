import Button from "../../../components/ui/Button";
import Icon from "../../../components/ui/Icon";

export default function UnderConstruction() {
  return (
    <div className="flex flex-col w-full justify-start items-center h-screen">
      <div className="flex flex-row w-full justify-center items-start">
        <img
          src="/images/logo.svg"
          alt=""
          className="w-1/2 mb-10 md:w-1/3 lg:w-1/4"
        />
      </div>
      <div className="flex flex-row justify-around bg-[url('/images/watermark-eye1.svg')] bg-cover bg-center bg-no-repeat">
        <img src="/images/photo-animated.png" alt="" className="w-1/2" />
      </div>
      <div className="flex flex-row mt-5 mb-2 text-3xl font-bold">
        Good code takes time. Coming soon!
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div>
          <Button
            variant="primary"
            size="large"
            className="font-bold w-full rounded-lg"
            onClick={() => {
              window.open("/resume.pdf");
            }}
          >
            Download CV
          </Button>
        </div>
        <div>
          <Button
            variant="secondary"
            size="large"
            className="flex font-bold w-full rounded-lg justify-center"
            type="link"
            url="https://www.linkedin.com/in/danespino91/?locale=en_US"
          >
            <Icon name="bootstrap/linkedin" className="mr-0.5" />
            LinkedIn
          </Button>
        </div>
        <div>
          <Button
            variant="secondary"
            size="large"
            className="flex font-bold w-full rounded-lg justify-center"
            type="link"
            url="https://github.com/danespino"
          >
            <Icon name="bootstrap/github" className="mr-0.5" />
            GitHub
          </Button>
        </div>
        <div>
          <Button
            variant="secondary"
            size="large"
            className="flex font-bold w-full rounded-lg justify-center"
          >
            <Icon name="bootstrap/envelope-at-fill" className="mr-0.5" />
            Contact
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-flow-row-dense gap-2 w-full items-center mt-2 pt-4 pb-10 lg:grid-cols-7 *:flex *:justify-center">
        <div className="grid gap-3 grid-cols-6 lg:col-span-2 *:text-gray-700 *:hover:text-white">
          <a
            href="https://www.linkedin.com/in/danespino91/?locale=en_US"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="bootstrap/linkedin"></Icon>
          </a>
          <a
            href="https://github.com/danespino"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="bootstrap/github"></Icon>
          </a>
          <a
            href="https://www.youtube.com/@MasterTech-With-DanEspino"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="bootstrap/youtube"></Icon>
          </a>
        </div>
        <div className="col-span-2 mt-4 font-mono text-xl lg:col-span-3">
          &copy; 2025. Dan Espino. All rights reserved
        </div>
        <div className="lg:col-span-2">
          <img src="/public/images/backstagepass.svg" width={128} />
        </div>
      </div>
    </div>
  );
}
