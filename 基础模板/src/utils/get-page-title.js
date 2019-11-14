import defaultSettings from "@/settings";

const title = "特色应用-人物与事件处理系统";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
