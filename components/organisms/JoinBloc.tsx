import { Button, Dialog, Typography } from "@ensdomains/thorin";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const DialogDemo = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { bloc: blocId } = useParams();

  return (
    <div>
      <Button
        onClick={() => setDialogOpen(true)}
        className={"!bg-[#4E81FF] !font-outfit"}
      >
        Join to Seed Melodies
      </Button>
      <Dialog
        open={dialogOpen}
        variant="blank"
        onDismiss={() => setDialogOpen(false)}
      >
        <Dialog.Heading title="Seed Box Initiation" />
        <Typography style={{ width: "500px" }}>
          Welcome to Seed Box Initiation! You're about to embark on a musical
          journey. Choose your path below:
        </Typography>
        <Dialog.Footer
          leading={
            <Button
              disabled
              className={"!font-outfit"}
              colorStyle="accentSecondary"
            >
              Import Existing Seed Box
            </Button>
          }
          trailing={
            <Link
              scroll={true}
              className="w-full"
              href={`/blocs/${blocId}/create-box`}
            >
              <Button className={"!bg-[#4E81FF] !font-outfit"}>
                Create New Seed Box
              </Button>
            </Link>
          }
        />
      </Dialog>
    </div>
  );
};

export default DialogDemo;
