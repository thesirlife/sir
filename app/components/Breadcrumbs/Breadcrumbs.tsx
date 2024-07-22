"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { Home, ViewModule } from "@mui/icons-material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import BreadcrumbsLink from "./BreadcrumbsLink";

type BreadcrumbsProps = {
  title?: string;
};

const Breadcrumbs = ({ title = "" }: BreadcrumbsProps) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  const pathsMap: Record<
    string,
    OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    }
  > = {
    posts: ViewModule,
    // eventually need to add whatever other pages/icons there are to this pathsMap dictionary
  };

  // this is hacky, fix
  if (pathNames.length > 2) {
    pathNames.pop();
    pathNames.unshift(title);
  }

  const Seperator = () => <span className="px-2"> / </span>;

  return (
    <div>
      <ul className="flex flex-col sm:flex-row list-none p-0 m-0">
        <li>
          <BreadcrumbsLink href="/" icon={Home}>
            My Dashboard
          </BreadcrumbsLink>
        </li>
        {pathNames.length > 0 && <Seperator />}
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;

          return (
            <Fragment key={index}>
              <li
                className={index + 1 === pathNames.length ? "opacity-70" : ""}
              >
                <BreadcrumbsLink href={href} icon={pathsMap["posts"]}>
                  {link
                    .replace(/\b\w/g, (char) => char.toUpperCase())
                    // gross one off to capitalize AI
                    .replace(/(?:^|\W)Ai(?:$|\W)/g, " AI ")
                    .replace(/-/g, " ")}
                </BreadcrumbsLink>
              </li>
              {pathNames.length !== index + 1 && <Seperator />}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
