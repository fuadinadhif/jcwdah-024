import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ArticleFormValues {
  title: string;
  content: string;
  image: string;
}

const articleValidationSchema = Yup.object({
  title: Yup.string()
    .min(3, "At least 3 characters")
    .required("Title is required"),
  content: Yup.string()
    .max(300, "Cannot be more than 300 characters")
    .required("Content is required"),
  image: Yup.string().url("Must be valid URL").required("Image is required"),
});

function CreatePage() {
  const initialValues = {
    title: "",
    content: "",
    image: "",
  };

  async function handleSubmit(
    values: ArticleFormValues,
    { resetForm }: { resetForm: () => void },
  ) {
    const response = await fetch(
      "https://desiredwinter-us.backendless.app/api/data/articles",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      },
    );

    if (response.ok) {
      alert("New article created!");
    } else {
      alert("Failed to create new article");
    }

    resetForm();
  }

  return (
    <main className="min-h-[calc(100vh-100px)]">
      <h1>Create New Article</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={articleValidationSchema}
      >
        {({ isSubmitting }) => (
          <Form style={{ display: "grid" }}>
            <label htmlFor="title">Title</label>
            <Field
              id="title"
              name="title"
              type="text"
              placeholder="Input the title here..."
            />
            <ErrorMessage
              name="title"
              component="p"
              // @ts-expect-error ErrorMessage does not have style props
              style={{ fontSize: "12px", color: "red" }}
            />

            <label htmlFor="content">Content</label>
            <Field
              id="content"
              name="content"
              as="textarea"
              rows={10}
              placeholder="Input the content here..."
            />
            <ErrorMessage
              name="content"
              component="p"
              // @ts-expect-error ErrorMessage does not have style props
              style={{ fontSize: "12px", color: "red" }}
            />

            <label htmlFor="image">Image</label>
            <Field
              id="image"
              name="image"
              type="text"
              placeholder="https://image.com"
            />
            <ErrorMessage
              name="image"
              component="p"
              // @ts-expect-error ErrorMessage does not have style props
              style={{ fontSize: "12px", color: "red" }}
            />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Article"}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default CreatePage;
