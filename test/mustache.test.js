import Mustache from "mustache";
import fs from "fs/promises";

test("Menggunakan Mustache", () => {
  const data = Mustache.render("Hello {{name}}", { name: "Dani" });

  expect(data).toBe("Hello Dani");
});

test("Menggunakan Mustache Cache", () => {
  Mustache.parse("Hello {{name}}");

  const data = Mustache.render("Hello {{name}}", { name: "Dani" });

  expect(data).toBe("Hello Dani");
});

test("Tags", () => {
  const data = Mustache.render("Hello {{name}}, my hobby is {{{hobby}}}", {
    name: "Dani",
    hobby: "<b>Programming</b>",
  });

  expect(data).toBe("Hello Dani, my hobby is <b>Programming</b>");
});

test("Nested Object", () => {
  Mustache.parse("Hello {{name}}");

  const data = Mustache.render("Hello {{person.name}}", {
    person: { name: "Dani" },
  });

  expect(data).toBe("Hello Dani");
});

test("Mustache File", async () => {
  const helloTemplate = await fs
    .readFile("./templates/hello.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    title: "Dani Yudistira Maulana",
  });

  console.info(data);

  expect(data).toContain("Dani Yudistira Maulana");
});

test("Mustache Section Not Show", async () => {
  const helloTemplate = await fs
    .readFile("./templates/person.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {});

  console.info(data);

  expect(data).not.toContain("Hello Person");
});

test("Mustache Section Show", async () => {
  const helloTemplate = await fs
    .readFile("./templates/person.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    person: {
      name: "Dani",
    },
  });

  console.info(data);

  expect(data).toContain("Hello Person");
});

test("Section Data", async () => {
  const helloTemplate = await fs
    .readFile("./templates/person.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    person: {
      name: "Dani",
    },
  });

  console.info(data);

  expect(data).toContain("Hello Person Dani!");
});

test("Inverted Section", async () => {
  const helloTemplate = await fs
    .readFile("./templates/person.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {});

  console.info(data);

  expect(data).toContain("Hello Guest");
});

test("List", async () => {
  const helloTemplate = await fs
    .readFile("./templates/hobbies.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    hobbies: ["Coding", "Gaming", "Reading"],
  });

  console.info(data);

  expect(data).toContain("Coding");
  expect(data).toContain("Gaming");
  expect(data).toContain("Reading");
});

test("List Object", async () => {
  const helloTemplate = await fs
    .readFile("./templates/students.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    students: [
      { name: "Dani", value: 100 },
      { name: "Dian", value: 95 },
    ],
  });

  console.info(data);

  expect(data).toContain("Dani");
  expect(data).toContain("Dian");
  expect(data).toContain("100");
  expect(data).toContain("95");
});

test("Functions", async () => {
  const parameter = {
    name: "Dani",
    upper: () => {
      return (text, render) => {
        return render(text).toUpperCase();
      };
    },
  };

  const data = Mustache.render("Hello {{#upper}}{{name}}{{/upper}}", parameter);

  console.info(data);

  expect(data).toBe("Hello DANI");
});

test("Comment", async () => {
  const helloTemplate = await fs
    .readFile("./templates/comment.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    title: "Dani",
  });

  console.info(data);

  expect(data).toContain("Dani");
  expect(data).not.toContain("Ini Komentar");
});

test("Partials", async () => {
  const contentTemplate = await fs
    .readFile("./templates/content.mustache")
    .then((data) => data.toString());

  const headerTemplate = await fs
    .readFile("./templates/header.mustache")
    .then((data) => data.toString());

  const footerTemplate = await fs
    .readFile("./templates/footer.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(
    contentTemplate,
    {
      title: "Partials",
      name: "Dani",
      content: "Belajar Mustache JS",
    },
    {
      header: headerTemplate,
      footer: footerTemplate,
    }
  );

  console.info(data);

  expect(data).toContain("Partials");
  expect(data).toContain("Dani");
  expect(data).toContain("Belajar Mustache JS");
  expect(data).toContain("Powered by Dani Yudistira Maulana");
});
