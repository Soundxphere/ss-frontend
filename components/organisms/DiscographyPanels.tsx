import DiscographyInfo from "../molecules/DiscographyInfo";
import JoinBloc from "./JoinBloc";
import SeedPlayback from "../molecules/SeedPlayback";

const DiscographyPanels = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-end gap-4 p-4">
      <DiscographyInfo
        info={{
          blocName: "Monum3ntal",
          blocDesc:
            "Developers of the Aave Protocol, which allows users to supply and borrow a wide range of digital assets without intermediaries, and Aave.com, an easy way to directly interact with the protocol and community.",
          chain: "Ethereum",
          status: "Complete",
          began: "2021",
        }}
      >
        <JoinBloc />
      </DiscographyInfo>
      <SeedPlayback
        id={"22"}
        name={"where are you now Diddy"}
        url={"https://gateway.lighthouse.storage/ipfs/QmcmY6EgHNrMunqWfXHsSpuZWU3z4qhZAjHtcFpRRRY9vX"}
      />
    </div>
  );
};

export default DiscographyPanels;
