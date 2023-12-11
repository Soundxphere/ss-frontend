import { cn } from "@/lib/utils";
import {
  Button,
  DotGridSVG,
  PersonSVG,
  Profile,
  Typography,
} from "@ensdomains/thorin";
import { ConnectButton as _ConnectButton } from "@rainbow-me/rainbowkit";

const Login = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <_ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            style={style}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    prefix={
                      <img
                        className="w-[1.5rem]"
                        src="/logo-white.svg"
                        alt="soundsphere logo"
                      />
                    }
                    loading={false}
                    onClick={openConnectModal}
                    shape="rounded"
                    className={cn(
                      "!w-max !bg-[#4E81FF] !font-outfit tracking-[1px]",
                    )}
                  >
                    Login
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    loading={false}
                    onClick={openChainModal}
                    shape="rounded"
                    className={cn(
                      "!w-max !bg-[#FF494A] !font-outfit tracking-[1px]",
                    )}
                  >
                    Wrong Network
                  </Button>
                );
              }
              return (
                <div className="flex items-center gap-4 ">
                  {account.displayBalance && (
                    <Typography fontVariant="smallBold">
                      {account.displayBalance}
                    </Typography>
                  )}

                  <button
                    onClick={openChainModal}
                    className="flex items-center gap-1"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        className={cn(
                          "h-6 w-6 overflow-hidden rounded-full",
                          chain.iconBackground,
                        )}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            className={"h-6 w-6"}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <div className="rounded-full border shadow-md">
                    <Profile
                      indicatorColor="red"
                      address={account.displayName}
                      avatar=""
                      ensName=""
                      dropdownItems={[
                        {
                          label: "Account",
                          onClick: openAccountModal,
                          icon: <PersonSVG />,
                        },
                        {
                          label: "Dashboard",
                          onClick: () => null,
                          icon: <DotGridSVG />,
                        },
                      ]}
                    />
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </_ConnectButton.Custom>
  );
};

export default Login;
