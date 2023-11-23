import { listSuggestions } from "../../common/data/list_suggestions";
import { StringUtils } from "../../utils";
import { ButtonLink } from "../button_link";
import { ItemRow } from "../item_row";

export const ListSuggestion = () => {
  return (
    <div>
      {listSuggestions &&
        listSuggestions.map((e) => {
          return (
            <ItemRow
            key={e.id}
              url={e.user.avatar}
              title={StringUtils.displayUserName(e.user.userName)}
              size={34}
              rightItem={
                <ButtonLink textBtn="Follow" onClick={() => console.log("")} />
              }
              subTitleItem = {
                <p className="text-xs text-secondary-text text-ellipsis font-medium">
                  {e.type}
                </p>
              }
            />
          );
        })}
    </div>
  );
};