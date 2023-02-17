import { ISharedText } from "./shared/Text";
import { ITag } from "./Tag";
import { ExtractNested } from "./builtins/ExtractNested";
import { ExtractFlat } from "./builtins/ExtractFlat";
import { RequiredBy } from "./builtins/RequiredBy";
export interface ICase<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      title: string | null;
      slug: string | null;
      blocks?: Array<ISharedText>;
      tags?: { data: ITag[] };
      publishedAt: string;
      createdAt: string;
      updatedAt: string;
    },
    ExtractFlat<Populate>
  >;
}
