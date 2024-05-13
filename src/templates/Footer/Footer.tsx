import MediaLinks from "./MediaLinks";

const Footer = () => {
  return (
    <footer className="border-indigo-600 border-t-4 bg-indigo-950 p-4">
      <MediaLinks />
      <div className="mt-4">
        <span className="block text-white text-center">
          2023 - InfOrbs
        </span>
      </div>
    </footer>
  )
}

export default Footer;
