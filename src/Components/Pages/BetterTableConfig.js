import Quill from "quill";
import QuillBetterTable from "quill-better-table";

// Patch: Add basic table tag to avoid undefined blot error
const Block = Quill.import("blots/block");
class TableBlot extends Block {}
TableBlot.blotName = "table";
TableBlot.tagName = "TABLE";
Quill.register(TableBlot, true);

// Register better-table
Quill.register(
  {
    "modules/better-table": QuillBetterTable.default || QuillBetterTable,
  },
  true
);

export default Quill;
