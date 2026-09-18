# Chloe Beauty Hub Desktop App

A native C++/Qt application for customers to:

- browse products and see their prices in naira;
- build and submit an order with delivery details;
- submit a rating and written feedback.

Orders and feedback are saved locally as CSV files in the operating system's application-data directory. This keeps the app usable without an internet connection.

## Build and run

From the project root:

```bash
cmake -S desktop-app -B desktop-app/build
cmake --build desktop-app/build
./desktop-app/build/chloe_beauty_hub_desktop
```

On Linux, the saved files are normally located under:

```text
~/.local/share/Chloe Beauty Hub/Chloe Beauty Hub/
```

The app needs Qt 6 Widgets and a C++17 compiler.
