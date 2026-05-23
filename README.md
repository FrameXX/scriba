<div align="center">

<img src="logo.png" style="width: 128px; height: 128px">

# Scriba

**A simple editor, previewer and exporter for AsciiDoc and MarkDown**

</div>

## Features description

The editor consists of 3 main areas. That being the writing area on the left, preview area on the right and the control panel at the bottom. The visibility of the writing area and the preview area can be changed with the button in the center of the control panel. Controls that are relevant to the writing area are positioned under the writing area and controls that are relevant to the preview area are positioned under the preview area. The changes you make in the writing area are continously saved to the browser storage and will persist across sessions. You can export your work to PDF or AsciiDoc source file. When exporting to PDF the app will open you browser's print dialog where an option "save to PDF" or "print to PDF" should be available.

## Development

I use [Bun](https://bun.com/) for package management. But realistically the current setup should work with [NodeJS](https://nodejs.org/en) too.

As a code editor I kindly recommend [Zed](https://zed.dev/).

- Use `bun run dev` to start a development server that will "hot reload" modules as you make changes in them.

- Use `bun run build` to build the app into files that can be distributed (hosted on a server).

- Use `bun run preview` to start a preview server which hosts the files for distribution you build with the `bun run build` command.

## Hosting

Run `docker compose up -d --build` to run a nginx server on port 3002.
