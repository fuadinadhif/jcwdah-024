import styles from "./App.module.css";
import Card from "./components/Card";

function App() {
  const fullName = "Pinnochio"; // implicit annotation

  return (
    <main>
      <h2 className={styles.title}>Hello, {fullName}!</h2>
      <h2>Welcome to React!</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio eum
        voluptas quisquam beatae nesciunt ad accusamus perspiciatis, atque
        totam. Aliquam eveniet odit nulla recusandae dicta, maxime cum
        distinctio deserunt tempora.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
        }}
      >
        <Card
          imagePath="/react-image-1.png"
          title="Create user interfaces from components"
        />
        <Card
          imagePath="/react-image-2.png"
          title="Write components with code and markup"
        />
        <Card
          imagePath="/react-image-3.png"
          title="Add interactivity wherever you need it"
        />
      </div>
    </main>
  );
}

export default App;

/* ---------------------------------- NOTES 
Component: Bentuk terkecil dari UI yang kita miliki

Cara membuat component:
1. Membuat sebuah fungsi
2. Nama fungsinya harus menggunakan PascalCase
3. Fungsinya harus di-export default
4. Fungsinya harus me-return satu kode HTML

Jenis Case:
1. PascalCase => HomePage 
2. camelCase => homePage
3. snake_case => home_page
4. kebab-case => home-page

JSX/TSX Structure:
JSX = JavaScript with X (HTML)
JS => Harus ditulis sebelum keyword return
HTML => Harus ditulis setelah keyword return
*Pengecualian => Kita bisa menulis JS di dalam HTML, asal menggunakan slot expression {}

Props: Cara untuk mengirim data dari parent ke children component
--------------------------------- */
