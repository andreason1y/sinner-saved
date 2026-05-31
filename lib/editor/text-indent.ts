import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    textIndent: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
    };
  }
}

const STEP = 40;
const MAX = 7;
const TYPES = ["paragraph", "heading", "blockquote"];

export const TextIndent = Extension.create({
  name: "textIndent",

  addGlobalAttributes() {
    return [
      {
        types: TYPES,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (el) => {
              const ml = (el as HTMLElement).style.marginLeft;
              return ml ? Math.round(parseInt(ml) / STEP) : 0;
            },
            renderHTML: ({ indent }) => {
              if (!indent) return {};
              return { style: `margin-left: ${indent * STEP}px` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      indent:
        () =>
        ({ tr, state, dispatch }) => {
          const { from, to } = state.selection;
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (TYPES.includes(node.type.name)) {
              const curr = (node.attrs.indent as number) ?? 0;
              if (curr < MAX && dispatch)
                tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: curr + 1 });
            }
          });
          return dispatch ? !!dispatch(tr) : true;
        },
      outdent:
        () =>
        ({ tr, state, dispatch }) => {
          const { from, to } = state.selection;
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (TYPES.includes(node.type.name)) {
              const curr = (node.attrs.indent as number) ?? 0;
              if (curr > 0 && dispatch)
                tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: curr - 1 });
            }
          });
          return dispatch ? !!dispatch(tr) : true;
        },
    };
  },
});
