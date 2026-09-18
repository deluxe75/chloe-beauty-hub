#include <QApplication>
#include <QComboBox>
#include <QDateTime>
#include <QDir>
#include <QFile>
#include <QFileInfo>
#include <QFormLayout>
#include <QHBoxLayout>
#include <QFrame>
#include <QHeaderView>
#include <QLabel>
#include <QLineEdit>
#include <QLocale>
#include <QMainWindow>
#include <QMessageBox>
#include <QPlainTextEdit>
#include <QPushButton>
#include <QSpinBox>
#include <QStandardPaths>
#include <QStatusBar>
#include <QTabWidget>
#include <QTableWidget>
#include <QTextStream>
#include <QVBoxLayout>

namespace {

struct Product {
    QString name;
    QString category;
    int price;
};

QString naira(int amount) {
    return QString::fromUtf8("₦") + QLocale().toString(amount);
}

QString csvField(QString value) {
    value.replace('"', "\"\"");
    return '"' + value + '"';
}

QString localDataDirectory() {
    const QString path = QStandardPaths::writableLocation(QStandardPaths::AppDataLocation);
    QDir().mkpath(path);
    return path;
}

bool appendCsvRow(const QString& fileName, const QStringList& fields, const QString& header) {
    const QString path = QDir(localDataDirectory()).filePath(fileName);
    const bool isNew = !QFile::exists(path) || QFileInfo(path).size() == 0;
    QFile file(path);
    if (!file.open(QIODevice::WriteOnly | QIODevice::Append | QIODevice::Text)) {
        return false;
    }

    QTextStream stream(&file);
    if (isNew) {
        stream << header << '\n';
    }

    QStringList escaped;
    for (const QString& field : fields) {
        escaped << csvField(field);
    }
    stream << escaped.join(',') << '\n';
    return true;
}

} // namespace

class MainWindow final : public QMainWindow {
public:
    MainWindow() {
        setWindowTitle("Chloe Beauty Hub | Customer Orders");
        resize(1000, 700);
        buildInterface();
        populateCatalogue();
        statusBar()->showMessage("Welcome to Chloe Beauty Hub");
    }

private:
    const QVector<Product> products {
        {"Bone Straight Wig", "Luxury Wig", 120000},
        {"Curly Wig", "Luxury Wig", 95000},
        {"Frontal Wig", "Luxury Wig", 140000},
        {"Ghana Cream", "Hair Care", 5000},
        {"Hair Oil", "Hair Care", 7500},
        {"Hair Serum", "Hair Care", 8000},
        {"Edge Control", "Hair Care", 5500},
        {"Leave-in Conditioner", "Hair Care", 15500},
        {"Moisturizer", "Hair Care", 6500},
    };

    QLineEdit* searchInput {};
    QComboBox* categoryInput {};
    QTableWidget* catalogueTable {};
    QLabel* selectedPriceLabel {};
    QTableWidget* cartTable {};
    QLabel* totalLabel {};
    QLineEdit* customerNameInput {};
    QLineEdit* customerPhoneInput {};
    QPlainTextEdit* addressInput {};
    QPlainTextEdit* orderNotesInput {};
    QLineEdit* feedbackNameInput {};
    QComboBox* ratingInput {};
    QPlainTextEdit* feedbackInput {};
    QVector<int> cartProductIndexes;
    QTabWidget* navigationTabs {};

    void buildInterface() {
        auto* root = new QWidget;
        auto* rootLayout = new QVBoxLayout(root);
        rootLayout->setContentsMargins(0, 0, 0, 0);
        rootLayout->setSpacing(0);

        auto* header = new QFrame;
        header->setObjectName("brandHeader");
        auto* headerLayout = new QHBoxLayout(header);
        headerLayout->setContentsMargins(30, 18, 30, 18);
        auto* brand = new QLabel("✦  Chloe Beauty Hub");
        brand->setObjectName("brandName");
        auto* tagline = new QLabel("LUXURY SALON & WIGS");
        tagline->setObjectName("brandTagline");
        auto* brandBlock = new QVBoxLayout;
        brandBlock->setSpacing(2);
        brandBlock->addWidget(brand);
        brandBlock->addWidget(tagline);
        auto* help = new QLabel("Browse prices • Add to bag • Place your order");
        help->setObjectName("headerHelp");
        headerLayout->addLayout(brandBlock);
        headerLayout->addStretch();
        headerLayout->addWidget(help);
        rootLayout->addWidget(header);

        navigationTabs = new QTabWidget;
        navigationTabs->setDocumentMode(true);
        navigationTabs->addTab(createCatalogueTab(), "Shop products");
        navigationTabs->addTab(createOrderTab(), "My bag (0)");
        navigationTabs->addTab(createFeedbackTab(), "Share feedback");
        rootLayout->addWidget(navigationTabs, 1);
        setCentralWidget(root);
    }

    QWidget* createCatalogueTab() {
        auto* page = new QWidget;
        auto* layout = new QVBoxLayout(page);
        layout->setContentsMargins(28, 28, 28, 28);
        layout->setSpacing(16);

        auto* title = new QLabel("Shop by product or check a price");
        title->setObjectName("pageTitle");
        auto* subtitle = new QLabel("Search the catalogue to check prices, then add items to your order.");
        subtitle->setObjectName("subtitle");
        layout->addWidget(title);
        layout->addWidget(subtitle);

        auto* filterRow = new QHBoxLayout;
        searchInput = new QLineEdit;
        searchInput->setPlaceholderText("Search wigs, oils, creams and more");
        categoryInput = new QComboBox;
        categoryInput->addItems({"All categories", "Luxury Wig", "Hair Care"});
        categoryInput->setMinimumWidth(150);
        filterRow->addWidget(searchInput, 1);
        filterRow->addWidget(categoryInput);
        layout->addLayout(filterRow);

        catalogueTable = new QTableWidget;
        catalogueTable->setColumnCount(4);
        catalogueTable->setHorizontalHeaderLabels({"Product", "Category", "Price", ""});
        catalogueTable->setSelectionBehavior(QAbstractItemView::SelectRows);
        catalogueTable->setSelectionMode(QAbstractItemView::SingleSelection);
        catalogueTable->setEditTriggers(QAbstractItemView::NoEditTriggers);
        catalogueTable->verticalHeader()->setVisible(false);
        catalogueTable->verticalHeader()->setDefaultSectionSize(52);
        catalogueTable->horizontalHeader()->setSectionResizeMode(0, QHeaderView::Stretch);
        catalogueTable->horizontalHeader()->setSectionResizeMode(1, QHeaderView::ResizeToContents);
        catalogueTable->horizontalHeader()->setSectionResizeMode(2, QHeaderView::ResizeToContents);
        catalogueTable->horizontalHeader()->setSectionResizeMode(3, QHeaderView::ResizeToContents);
        layout->addWidget(catalogueTable, 1);

        auto* actionRow = new QHBoxLayout;
        selectedPriceLabel = new QLabel("Select a product to view its price.");
        selectedPriceLabel->setObjectName("priceLabel");
        auto* addButton = new QPushButton("Add selected to bag");
        addButton->setObjectName("primaryButton");
        actionRow->addWidget(selectedPriceLabel);
        actionRow->addStretch();
        actionRow->addWidget(addButton);
        layout->addLayout(actionRow);

        connect(searchInput, &QLineEdit::textChanged, this, [this] { populateCatalogue(); });
        connect(categoryInput, &QComboBox::currentTextChanged, this, [this] { populateCatalogue(); });
        connect(catalogueTable, &QTableWidget::itemSelectionChanged, this, [this] { updateSelectedPrice(); });
        connect(addButton, &QPushButton::clicked, this, [this] { addSelectedProduct(); });
        connect(catalogueTable, &QTableWidget::cellDoubleClicked, this, [this](int, int) { addSelectedProduct(); });
        return page;
    }

    QWidget* createOrderTab() {
        auto* page = new QWidget;
        auto* layout = new QVBoxLayout(page);
        layout->setContentsMargins(28, 28, 28, 28);
        layout->setSpacing(14);

        auto* title = new QLabel("Your bag");
        title->setObjectName("pageTitle");
        layout->addWidget(title);

        cartTable = new QTableWidget;
        cartTable->setColumnCount(5);
        cartTable->setHorizontalHeaderLabels({"Product", "Unit price", "Quantity", "Subtotal", ""});
        cartTable->setSelectionMode(QAbstractItemView::NoSelection);
        cartTable->setEditTriggers(QAbstractItemView::NoEditTriggers);
        cartTable->verticalHeader()->setVisible(false);
        cartTable->verticalHeader()->setDefaultSectionSize(46);
        cartTable->horizontalHeader()->setSectionResizeMode(0, QHeaderView::Stretch);
        cartTable->horizontalHeader()->setSectionResizeMode(1, QHeaderView::ResizeToContents);
        cartTable->horizontalHeader()->setSectionResizeMode(2, QHeaderView::ResizeToContents);
        cartTable->horizontalHeader()->setSectionResizeMode(3, QHeaderView::ResizeToContents);
        cartTable->horizontalHeader()->setSectionResizeMode(4, QHeaderView::ResizeToContents);
        layout->addWidget(cartTable, 1);

        totalLabel = new QLabel("Order total: ₦0");
        totalLabel->setObjectName("totalLabel");
        totalLabel->setAlignment(Qt::AlignRight);
        layout->addWidget(totalLabel);

        auto* checkoutLabel = new QLabel("Delivery details");
        checkoutLabel->setObjectName("sectionTitle");
        layout->addWidget(checkoutLabel);
        auto* details = new QFrame;
        details->setObjectName("detailsCard");
        auto* form = new QFormLayout(details);
        form->setContentsMargins(18, 18, 18, 18);
        form->setSpacing(10);
        customerNameInput = new QLineEdit;
        customerNameInput->setPlaceholderText("Your full name");
        customerPhoneInput = new QLineEdit;
        customerPhoneInput->setPlaceholderText("e.g. +234 800 000 0000");
        addressInput = new QPlainTextEdit;
        addressInput->setPlaceholderText("Delivery address");
        addressInput->setFixedHeight(55);
        orderNotesInput = new QPlainTextEdit;
        orderNotesInput->setPlaceholderText("Optional colour, size, delivery or styling notes");
        orderNotesInput->setFixedHeight(55);
        form->addRow("Full name *", customerNameInput);
        form->addRow("Phone number *", customerPhoneInput);
        form->addRow("Delivery address *", addressInput);
        form->addRow("Order notes", orderNotesInput);
        layout->addWidget(details);

        auto* submit = new QPushButton("Place order");
        submit->setObjectName("primaryButton");
        submit->setMinimumHeight(42);
        layout->addWidget(submit, 0, Qt::AlignRight);
        connect(submit, &QPushButton::clicked, this, [this] { placeOrder(); });
        return page;
    }

    QWidget* createFeedbackTab() {
        auto* page = new QWidget;
        auto* layout = new QVBoxLayout(page);
        layout->setContentsMargins(80, 42, 80, 42);
        layout->setSpacing(16);

        auto* title = new QLabel("We would love your feedback");
        title->setObjectName("pageTitle");
        auto* prompt = new QLabel("Your feedback helps Chloe Beauty Hub improve every appointment and order.");
        prompt->setObjectName("subtitle");
        prompt->setWordWrap(true);
        layout->addWidget(title);
        layout->addWidget(prompt);

        auto* form = new QFormLayout;
        form->setSpacing(12);
        feedbackNameInput = new QLineEdit;
        feedbackNameInput->setPlaceholderText("Your name (optional)");
        ratingInput = new QComboBox;
        ratingInput->addItems({"5 - Excellent", "4 - Great", "3 - Good", "2 - Fair", "1 - Poor"});
        feedbackInput = new QPlainTextEdit;
        feedbackInput->setPlaceholderText("Share your experience, product thoughts or suggestions...");
        feedbackInput->setMinimumHeight(150);
        form->addRow("Name", feedbackNameInput);
        form->addRow("Rating", ratingInput);
        form->addRow("Feedback *", feedbackInput);
        layout->addLayout(form);

        auto* sendButton = new QPushButton("Send feedback");
        sendButton->setObjectName("primaryButton");
        layout->addWidget(sendButton, 0, Qt::AlignRight);
        layout->addStretch();
        connect(sendButton, &QPushButton::clicked, this, [this] { saveFeedback(); });
        return page;
    }

    void populateCatalogue() {
        const QString filter = searchInput->text().trimmed();
        const QString category = categoryInput->currentText();
        catalogueTable->setRowCount(0);
        for (int index = 0; index < products.size(); ++index) {
            const Product& product = products.at(index);
            if (!filter.isEmpty() && !product.name.contains(filter, Qt::CaseInsensitive)
                && !product.category.contains(filter, Qt::CaseInsensitive)) {
                continue;
            }
            if (category != "All categories" && product.category != category) {
                continue;
            }
            const int row = catalogueTable->rowCount();
            catalogueTable->insertRow(row);
            auto* name = new QTableWidgetItem(product.name);
            name->setData(Qt::UserRole, index);
            catalogueTable->setItem(row, 0, name);
            catalogueTable->setItem(row, 1, new QTableWidgetItem(product.category));
            auto* price = new QTableWidgetItem(naira(product.price));
            price->setTextAlignment(Qt::AlignRight | Qt::AlignVCenter);
            catalogueTable->setItem(row, 2, price);
            auto* add = new QPushButton("Add to bag");
            add->setObjectName("secondaryButton");
            catalogueTable->setCellWidget(row, 3, add);
            connect(add, &QPushButton::clicked, this, [this, index] { addProduct(index); });
        }
        selectedPriceLabel->setText("Select a product to view its price.");
    }

    void updateSelectedPrice() {
        const int row = catalogueTable->currentRow();
        if (row < 0 || !catalogueTable->item(row, 0)) {
            return;
        }
        const Product& product = products.at(catalogueTable->item(row, 0)->data(Qt::UserRole).toInt());
        selectedPriceLabel->setText(product.name + " costs " + naira(product.price));
    }

    void addSelectedProduct() {
        const int row = catalogueTable->currentRow();
        if (row < 0 || !catalogueTable->item(row, 0)) {
            QMessageBox::information(this, "Choose a product", "Select a product from the catalogue first.");
            return;
        }
        addProduct(catalogueTable->item(row, 0)->data(Qt::UserRole).toInt());
    }

    void addProduct(int productIndex) {
        cartProductIndexes.append(productIndex);
        rebuildCart();
        statusBar()->showMessage(products.at(productIndex).name + " was added to your bag.", 3500);
    }

    void rebuildCart() {
        cartTable->setRowCount(0);
        for (int row = 0; row < cartProductIndexes.size(); ++row) {
            const Product& product = products.at(cartProductIndexes.at(row));
            cartTable->insertRow(row);
            cartTable->setItem(row, 0, new QTableWidgetItem(product.name));
            auto* unitPrice = new QTableWidgetItem(naira(product.price));
            unitPrice->setTextAlignment(Qt::AlignRight | Qt::AlignVCenter);
            cartTable->setItem(row, 1, unitPrice);

            auto* quantity = new QSpinBox;
            quantity->setRange(1, 20);
            quantity->setValue(1);
            cartTable->setCellWidget(row, 2, quantity);
            auto* subtotal = new QTableWidgetItem(naira(product.price));
            subtotal->setTextAlignment(Qt::AlignRight | Qt::AlignVCenter);
            cartTable->setItem(row, 3, subtotal);

            auto* remove = new QPushButton("Remove");
            remove->setObjectName("secondaryButton");
            cartTable->setCellWidget(row, 4, remove);
            connect(quantity, qOverload<int>(&QSpinBox::valueChanged), this, [this, row, product](int value) {
                auto* item = cartTable->item(row, 3);
                if (item) item->setText(naira(product.price * value));
                updateTotal();
            });
            connect(remove, &QPushButton::clicked, this, [this, row] {
                cartProductIndexes.removeAt(row);
                rebuildCart();
            });
        }
        updateTotal();
    }

    int currentTotal() const {
        int total = 0;
        for (int row = 0; row < cartProductIndexes.size(); ++row) {
            auto* quantity = qobject_cast<QSpinBox*>(cartTable->cellWidget(row, 2));
            total += products.at(cartProductIndexes.at(row)).price * (quantity ? quantity->value() : 1);
        }
        return total;
    }

    void updateTotal() {
        totalLabel->setText("Order total: " + naira(currentTotal()));
        navigationTabs->setTabText(1, QString("My bag (%1)").arg(cartProductIndexes.size()));
    }

    void placeOrder() {
        const QString name = customerNameInput->text().trimmed();
        const QString phone = customerPhoneInput->text().trimmed();
        const QString address = addressInput->toPlainText().trimmed();
        if (cartProductIndexes.isEmpty()) {
            QMessageBox::warning(this, "Your order is empty", "Add at least one product before placing your order.");
            return;
        }
        if (name.isEmpty() || phone.isEmpty() || address.isEmpty()) {
            QMessageBox::warning(this, "Missing customer details", "Please provide your name, phone number and delivery address.");
            return;
        }

        QStringList orderItems;
        for (int row = 0; row < cartProductIndexes.size(); ++row) {
            const auto* quantity = qobject_cast<QSpinBox*>(cartTable->cellWidget(row, 2));
            const int amount = quantity ? quantity->value() : 1;
            orderItems << QString("%1 x%2").arg(products.at(cartProductIndexes.at(row)).name).arg(amount);
        }
        const QString orderId = "CBH-" + QDateTime::currentDateTime().toString("yyyyMMddhhmmss");
        const bool saved = appendCsvRow(
            "orders.csv",
            {orderId, QDateTime::currentDateTime().toString(Qt::ISODate), name, phone, address,
             orderItems.join("; "), naira(currentTotal()), orderNotesInput->toPlainText().trimmed()},
            "order_id,created_at,customer_name,phone,address,items,total,notes");
        if (!saved) {
            QMessageBox::critical(this, "Order not saved", "The order could not be saved on this computer. Please try again.");
            return;
        }

        QMessageBox::information(this, "Order received", QString("Thank you, %1! Your order reference is %2.").arg(name, orderId));
        cartProductIndexes.clear();
        rebuildCart();
        customerNameInput->clear();
        customerPhoneInput->clear();
        addressInput->clear();
        orderNotesInput->clear();
        statusBar()->showMessage("Order " + orderId + " saved locally.", 5000);
    }

    void saveFeedback() {
        const QString feedback = feedbackInput->toPlainText().trimmed();
        if (feedback.isEmpty()) {
            QMessageBox::warning(this, "Feedback is empty", "Please write your feedback before sending it.");
            return;
        }
        const bool saved = appendCsvRow(
            "feedback.csv",
            {QDateTime::currentDateTime().toString(Qt::ISODate), feedbackNameInput->text().trimmed(),
             ratingInput->currentText(), feedback},
            "created_at,name,rating,feedback");
        if (!saved) {
            QMessageBox::critical(this, "Feedback not saved", "Your feedback could not be saved on this computer. Please try again.");
            return;
        }
        QMessageBox::information(this, "Thank you", "Your feedback has been received.");
        feedbackNameInput->clear();
        feedbackInput->clear();
        ratingInput->setCurrentIndex(0);
        statusBar()->showMessage("Feedback saved locally.", 5000);
    }
};

int main(int argc, char* argv[]) {
    QApplication app(argc, argv);
    app.setApplicationName("Chloe Beauty Hub");
    app.setOrganizationName("Chloe Beauty Hub");
    app.setStyleSheet(R"(
        QMainWindow { background: #fffdfb; color: #000000; }
        QFrame#brandHeader { background: #fff8fa; border-bottom: 1px solid #eacdd5; }
        QLabel#brandName { color: #000000; font-size: 24px; font-weight: 700; }
        QLabel#brandTagline { color: #000000; font-size: 10px; font-weight: 700; letter-spacing: 2px; }
        QLabel#headerHelp { color: #000000; font-size: 13px; }
        QTabWidget::pane { border: 0; }
        QTabBar::tab { background: #f9f1f3; color: #000000; padding: 13px 24px; margin-right: 2px; min-width: 130px; }
        QTabBar::tab:selected { background: #f1d7df; color: #000000; font-weight: 600; }
        QLabel#pageTitle { color: #000000; font-size: 26px; font-weight: 700; }
        QLabel#sectionTitle { color: #000000; font-size: 16px; font-weight: 700; margin-top: 8px; }
        QLabel#subtitle { color: #000000; font-size: 14px; }
        QLabel#priceLabel { color: #000000; font-size: 15px; font-weight: 600; }
        QLabel#totalLabel { color: #000000; font-size: 19px; font-weight: 700; }
        QLineEdit, QPlainTextEdit, QComboBox { background: white; color: #000000; border: 1px solid #eacdd5; border-radius: 6px; padding: 8px; }
        QLineEdit:focus, QPlainTextEdit:focus, QComboBox:focus { border: 2px solid #b33959; }
        QTableWidget { background: white; border: 1px solid #eedee2; border-radius: 8px; gridline-color: #f2e8e8; selection-background-color: #f6e2e8; selection-color: #2d1b22; }
        QHeaderView::section { background: #faf2f4; color: #000000; border: 0; border-bottom: 1px solid #eacdd5; padding: 9px; font-weight: 600; }
        QFrame#detailsCard { background: #faf6f6; border: 1px solid #f0e1e5; border-radius: 8px; }
        QPushButton#primaryButton { background: #f1d7df; border: 1px solid #dcaebb; border-radius: 7px; color: #000000; font-weight: 600; padding: 10px 18px; }
        QPushButton#primaryButton:hover { background: #eac4cf; }
        QPushButton#secondaryButton { background: #f7e9ed; border: 1px solid #e7c4cf; border-radius: 5px; color: #000000; padding: 5px 9px; }
        QPushButton#secondaryButton:hover { background: #f2dbe2; }
    )");

    MainWindow window;
    window.show();
    return app.exec();
}
