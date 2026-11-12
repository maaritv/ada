import pandas as pd
from datetime import date


# =====================================================
# Configuration
# =====================================================

LOAD_DATE = date.today().isoformat()
RECORD_SOURCE = "LibraryDB"


# =====================================================
# Generic Data Vault Functions
# =====================================================

def create_hub(
    df: pd.DataFrame,
    business_key: str,
    hub_key: str,
    record_source: str,
    load_date: str,
) -> pd.DataFrame:
    """
    Create a Hub table from a business key.
    """

    hub = df[[business_key]].drop_duplicates().copy()

    hub[hub_key] = hub[business_key]
    hub["LoadDate"] = load_date
    hub["RecordSource"] = record_source

    return hub[
        [hub_key, business_key, "LoadDate", "RecordSource"]
    ]


def create_satellite(
    df: pd.DataFrame,
    parent_key_column: str,
    parent_key_name: str,
    attribute_columns: list[str],
    load_date: str,
) -> pd.DataFrame:
    """
    Create a Satellite table.
    """

    sat = df.copy()

    sat[parent_key_name] = sat[parent_key_column]
    sat["LoadDate"] = load_date

    return sat[
        [parent_key_name] +
        attribute_columns +
        ["LoadDate"]
    ]


def create_link(
    df: pd.DataFrame,
    link_key_column: str,
    link_key_name: str,
    foreign_keys: dict,
    load_date: str,
) -> pd.DataFrame:
    """
    Create a Link table.

    foreign_keys example:
    {
        "BookID": "Book_HK",
        "CustomerID": "Customer_HK"
    }
    """

    link = df.copy()

    link[link_key_name] = link[link_key_column]

    for source_col, target_col in foreign_keys.items():
        link[target_col] = link[source_col]

    link["LoadDate"] = load_date

    output_columns = (
        [link_key_name]
        + list(foreign_keys.values())
        + [link_key_column, "LoadDate"]
    )

    return link[output_columns]


# =====================================================
# Load Source Data
# =====================================================

books = pd.read_csv("books_t.csv")
loans = pd.read_csv("book_loans_t.csv")


# =====================================================
# HUBS
# =====================================================

hub_book = create_hub(
    df=books,
    business_key="BookID",
    hub_key="Book_HK",
    record_source=RECORD_SOURCE,
    load_date=LOAD_DATE,
)

hub_customer = create_hub(
    df=loans,
    business_key="CustomerID",
    hub_key="Customer_HK",
    record_source=RECORD_SOURCE,
    load_date=LOAD_DATE,
)


# =====================================================
# BOOK SATELLITE
# =====================================================

sat_book = create_satellite(
    df=books,
    parent_key_column="BookID",
    parent_key_name="Book_HK",
    attribute_columns=[
        "ISBN",
        "Title",
        "Author",
        "PublicationYear",
    ],
    load_date=LOAD_DATE,
)


# =====================================================
# LOAN LINK
# =====================================================

link_loan = create_link(
    df=loans,
    link_key_column="LoanID",
    link_key_name="Loan_HK",
    foreign_keys={
        "BookID": "Book_HK",
        "CustomerID": "Customer_HK",
    },
    load_date=LOAD_DATE,
)


# =====================================================
# LOAN SATELLITE
# =====================================================

sat_loan = create_satellite(
    df=loans,
    parent_key_column="LoanID",
    parent_key_name="Loan_HK",
    attribute_columns=[
        "LoanDate",
        "ReturnDate",
    ],
    load_date=LOAD_DATE,
)


# =====================================================
# Save Data Vault Tables
# =====================================================

hub_book.to_csv("Hub_Book.csv", index=False)
hub_customer.to_csv("Hub_Customer.csv", index=False)

sat_book.to_csv("Sat_Book.csv", index=False)
sat_loan.to_csv("Sat_Loan.csv", index=False)

link_loan.to_csv("Link_Loan.csv", index=False)

print("Data Vault tables created successfully.")