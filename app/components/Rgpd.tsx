export default function RgpdNotice() {
  return (
    <div className="text-xs text-gray-600 space-y-2">
      <p className="font-semibold text-gray-700">
        Protection des données personnelles
      </p>
      <p>
        Les informations recueillies à partir de ce formulaire font l’objet d’un
        traitement informatique destiné à Indorama Ventures, responsable du
        traitement, afin de répondre à votre demande de contact.
      </p>
      <p>
        Les données marquées d’un astérisque (*) sont obligatoires pour le
        traitement de votre demande.
      </p>
      <p>
        Vos données sont conservées pendant 24 mois après le dernier contact, et
        sont uniquement accessibles par les personnes habilitées de Sacha Katic.
      </p>
      <p>
        Conformément au Règlement Général sur la Protection des Données (RGPD)
        et à la loi Informatique et Libertés, vous pouvez exercer vos droits
        d’accès, de rectification, de suppression, de limitation ou
        d’opposition en contactant :
        <a
          href="mailto:Contact-rgpg@fr.indorama.net"
          className="text-blue-600 hover:underline ml-1"
        >
          Contact-rgpg@fr.indorama.net
        </a>
      </p>
    </div>
  );
}