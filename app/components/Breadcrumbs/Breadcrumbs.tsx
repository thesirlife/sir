"use client";

import { usePathname } from "next/navigation";
import { FC, Fragment } from "react";
import { Home, ViewModule } from "@mui/icons-material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import BreadcrumbsLink from "./BreadcrumbsLink";

const Breadcrumbs: FC = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  // remove last item from array since we aren't putting current page in breadcrumbs
  pathNames.pop();

  const pathsMap: Record<
    string,
    OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    }
  > = {
    "general-learning": ViewModule,
    // eventually need to add whatever other pages/icons there are to this pathsMap dictionary
  };

  const Seperator: FC = () => <span className="px-2"> / </span>;

  return (
    <div>
      <ul className="flex flex-row">
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
              <li>
                <BreadcrumbsLink
                  href={href}
                  icon={pathsMap["general-learning"]}
                >
                  {link
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
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
