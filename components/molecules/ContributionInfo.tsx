interface ContributionInfoProps {
  description: string;
  status: string;
  author: string;
  creationDate: string;
  lastUpdated: string;
  contributors: string[];
}

const ContributionInfo = (props: ContributionInfoProps) => {
  return (
    <div className="flex w-full rounded-3xl bg-white p-6 text-black">
      {/* Replace with your actual Music Player component */}
      <p className="mb-2 text-lg font-bold">Music Player Component</p>
      <div>
        <p className="mb-4 text-gray-700">{props.description}</p>
        <p className="mb-4 font-semibold ">
          Status: <span className="font-normal">{props.status}</span>
        </p>
        <p className="mb-4 font-semibold">
          Author: <span className="font-normal">{props.author}</span>
        </p>
        <p className="mb-4 font-semibold">
          Created on: <span className="font-normal">{props.creationDate}</span>
        </p>
        <p className="mb-4 font-semibold">
          Last updated: <span className="font-normal">{props.lastUpdated}</span>
        </p>
        <div className="mb-2 font-semibold">Contributors:</div>
        <div className="flex flex-wrap">
          {props.contributors.map((member, index) => (
            <span key={index} className="mb-2 mr-2 rounded bg-gray-200 p-2">
              {member}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionInfo;
