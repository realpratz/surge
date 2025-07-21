import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import materialOceanTheme from "../material-ocean-theme";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

//Styling for latex
import "katex/dist/katex.min.css";

export default function Markdown({ content }: { content: string }) {
  return (
    <div className={`max-w-3xl mx-auto`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            const language = match && match[1];

            return match && language != "math" ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={language}
                style={materialOceanTheme}
              />
            ) : (
              <code className={className}>{children?.toString()}</code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
