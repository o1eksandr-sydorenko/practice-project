import * as fs from "fs";
import readline from "readline";
import { join } from "path";

type Click = { user: string; date: string };
type UserClicks = { user: string; clicks: number };

// type guard
const isClick = (obj: unknown): obj is Click => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "user" in obj &&
    "date" in obj &&
    typeof (obj as Click).user === "string" &&
    typeof (obj as Click).date === "string"
  );
};

const getClicksPerUsers = async (): Promise<UserClicks[]> => {
  return new Promise((resolve, reject) => {
    const file = join(process.cwd(), "logs", "clicks.log");
    const readInterface = readline.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false,
    });

    const userClicks: Record<string, number> = {};

    readInterface.on("line", (line) => {
      try {
        const click = JSON.parse(line);

        if (!isClick(click)) {
          console.log(`Click has wrong format: ${line}`, { click });
          return;
        }

        if (userClicks[click.user]) {
          userClicks[click.user]++;
        } else {
          userClicks[click.user] = 1;
        }
      } catch (error) {
        console.error(`Error parsing line: ${line}`, error);
      }
    });

    readInterface.on("close", () => {
      resolve(
        Object.keys(userClicks).map(
          (key: string): UserClicks => ({
            user: key,
            clicks: userClicks[key],
          })
        )
      );
    });

    readInterface.on("error", (err) => {
      reject(err);
    });
  });
};

const main = async (): Promise<void> => {
  const clicks = await getClicksPerUsers();

  console.log({ clicks });
};

void main();
