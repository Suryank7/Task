import React from "react";
import { InputField } from "./components/ui/InputField";
import { DataTable } from "./components/ui/DataTable";

type User = { id: number; name: string; email: string; age: number };

const sample: User[] = [
  { id: 1, name: "Aarya", email: "aarya@example.com", age: 22 },
  { id: 2, name: "Bhavesh", email: "bhavesh@example.com", age: 19 },
  { id: 3, name: "Chirag", email: "chirag@example.com", age: 25 },
  { id: 4, name: "Mayank", email: "Mayank@example.com", age: 27 },
  { id: 5, name: "Sundar", email: "Sundar@example.com", age: 21 },
  { id: 6, name: "Chetan", email: "Chetan@example.com", age: 23 },
];

export default function App() {
  const [value, setValue] = React.useState("");
  const [dark, setDark] = React.useState(false);
  return (
    <div className={dark ? "dark min-h-screen" : "min-h-screen"}>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-center w-full dark:text-white">
            UI Components Demo Task
          </h1>
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-2 rounded-xl border bg-gray-100 hover:bg-gray-200 border-gray-500 dark:bg-background-color dark:hover:bg-gray-700 dark:text-white"
            aria-pressed={dark}
          >
            {dark ? "Light" : "Dark"}
          </button>
        </div>

        <div className="mx-8 grid grid-cols-1 gap-8">
          <div className="card p-6 space-y-4 ">
            <h2 className="text-lg font-medium text-center">InputField</h2>
            <InputField
              label="Your name"
              placeholder="Type here..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              helperText="We won’t sell it to aliens."
              variant="outlined"
              size="md"
              clearable
              
            />
            <InputField
              label="Password"
              placeholder="••••••••"
              type="password"
              helperText="Use at least 8 characters and a combination of letters, numbers and Special symbols."
              variant="filled"
              size="md"
              passwordToggle
            />
            <InputField
              label="Loading state"
              placeholder="Processing..."
              loading
              helperText="We’re doing important stuff."
              variant="ghost"
              size="sm"
            />
            <InputField
              label="Invalid example"
              placeholder="Oops"
              invalid
              errorMessage="This field is required."
              variant="outlined"
              size="lg"
            />
          </div>

          <div className="card p-6 space-y-4">
            <h2 className="text-lg text-center font-medium ">DataTable</h2>
            <DataTable<User>
              data={sample}
              columns={[
                {
                  key: "name",
                  title: "Name",
                  dataIndex: "name",
                  sortable: true,
                },
                { key: "email", title: "Email", dataIndex: "email" },
                { key: "age", title: "Age", dataIndex: "age", sortable: true },
              ]}
              selectable
              onRowSelect={(rows) => console.log("Selected rows", rows)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
