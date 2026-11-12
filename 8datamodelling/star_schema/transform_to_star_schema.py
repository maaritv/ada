import pandas as pd


# =====================================================
# Generic Star Schema Functions
# =====================================================

def create_book_dimension(books: pd.DataFrame) -> pd.DataFrame:
    """Create Book dimension."""

    dim_book = books.copy()

    dim_book["BookKey"] = dim_book["BookID"]

    return dim_book[
        [
            "BookKey",
            "BookID",
            "ISBN",
            "Title",
            "Author",
            "PublicationYear",
        ]
    ]


def create_customer_dimension(customers: pd.DataFrame) -> pd.DataFrame:
    """Create Customer dimension."""

    dim_customer = customers.copy()

    dim_customer["CustomerKey"] = dim_customer["CustomerID"]

    return dim_customer[
        [
            "CustomerKey",
            "CustomerID",
            "FirstName",
            "LastName",
            "City",
            "CustomerSince",
        ]
    ]


def create_date_dimension(loans: pd.DataFrame) -> pd.DataFrame:
    """Create Date dimension from loan dates."""

    dates = pd.to_datetime(loans["LoanDate"])

    dim_date = pd.DataFrame()

    dim_date["Date"] = dates.drop_duplicates().sort_values()

    dim_date["DateKey"] = (
        dim_date["Date"]
        .dt.strftime("%Y%m%d")
        .astype(int)
    )

    dim_date["Year"] = dim_date["Date"].dt.year
    dim_date["Quarter"] = dim_date["Date"].dt.quarter
    dim_date["Month"] = dim_date["Date"].dt.month
    dim_date["MonthName"] = dim_date["Date"].dt.month_name()
    dim_date["Week"] = dim_date["Date"].dt.isocalendar().week
    dim_date["Day"] = dim_date["Date"].dt.day
    dim_date["Weekday"] = dim_date["Date"].dt.day_name()

    return dim_date[
        [
            "DateKey",
            "Date",
            "Year",
            "Quarter",
            "Month",
            "MonthName",
            "Week",
            "Day",
            "Weekday",
        ]
    ]


def create_loan_fact(loans: pd.DataFrame) -> pd.DataFrame:
    """Create loan fact table."""

    fact = loans.copy()

    fact["LoanKey"] = fact["LoanID"]
    fact["BookKey"] = fact["BookID"]
    fact["CustomerKey"] = fact["CustomerID"]

    fact["DateKey"] = (
        pd.to_datetime(fact["LoanDate"])
        .dt.strftime("%Y%m%d")
        .astype(int)
    )

    fact["LoanCount"] = 1

    fact["LoanDurationDays"] = (
        pd.to_datetime(fact["ReturnDate"], errors="coerce")
        - pd.to_datetime(fact["LoanDate"])
    ).dt.days

    return fact[
        [
            "LoanKey",
            "BookKey",
            "CustomerKey",
            "DateKey",
            "LoanCount",
            "LoanDurationDays",
        ]
    ]


# =====================================================
# Main ETL Process
# =====================================================

def main():

    print("Reading source files...")

    books = pd.read_csv("../inputdata/books_t.csv")
    customers = pd.read_csv("../inputdata/customers_t.csv")
    loans = pd.read_csv("../inputdata/book_loans_t.csv")

    print("Creating dimensions...")

    dim_book = create_book_dimension(books)
    dim_customer = create_customer_dimension(customers)
    dim_date = create_date_dimension(loans)

    print("Creating fact table...")

    fact_loan = create_loan_fact(loans)

    print("Writing CSV files...")

    dim_book.to_csv("Dim_Book.csv", index=False)
    dim_customer.to_csv("Dim_Customer.csv", index=False)
    dim_date.to_csv("Dim_Date.csv", index=False)

    fact_loan.to_csv("Fact_Loan.csv", index=False)

    print()
    print("Star schema successfully created.")
    print()
    print("Generated tables:")
    print("- Dim_Book.csv")
    print("- Dim_Customer.csv")
    print("- Dim_Date.csv")
    print("- Fact_Loan.csv")


if __name__ == "__main__":
    main()