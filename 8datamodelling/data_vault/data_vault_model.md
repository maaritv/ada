
                 +------------------+
                 |     HUB_BOOK     |
                 +------------------+
                 | Book_HK          |
                 | BookID           |
                 | LoadDate         |
                 | RecordSource     |
                 +------------------+
                          |
                          |
         +----------------+----------------+
         |                                 |
         v                                 v

+------------------+              +------------------+
|    SAT_BOOK      |              |    LINK_LOAN     |
+------------------+              +------------------+
| Book_HK          |              | Loan_HK          |
| ISBN             |              | Book_HK          |
| Title            |              | Customer_HK      |
| Author           |              | LoanID           |
| PublicationYear  |              | LoadDate         |
| LoadDate         |              +------------------+
+------------------+                       |
                                           |
                                           |
                           +---------------+---------------+
                           |                               |
                           v                               v

                 +------------------+           +------------------+
                 |  HUB_CUSTOMER    |           |    SAT_LOAN      |
                 +------------------+           +------------------+
                 | Customer_HK      |           | Loan_HK          |
                 | CustomerID       |           | LoanDate         |
                 | LoadDate         |           | ReturnDate       |
                 | RecordSource     |           | LoadDate         |
                 +------------------+           +------------------+
                          |
                          |
                          v

                 +------------------+
                 |  SAT_CUSTOMER    |
                 +------------------+
                 | Customer_HK      |
                 | FirstName        |
                 | LastName         |
                 | City             |
                 | CustomerSince    |
                 | LoadDate         |
                 +------------------+