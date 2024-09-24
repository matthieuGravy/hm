import { Typography } from "./../../components/common/Typography";

export const Home = () => {
  return (
    <>
      <div>Home</div>
      <Typography variant="h1">Titre principal</Typography>
      <Typography variant="p" as="div">
        Un paragraphe dans une div
      </Typography>
      <Typography variant="small" className="ui-text-blue-500">
        Petit texte personnalisé
      </Typography>
    </>
  );
};
