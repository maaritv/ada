
                    +------------------+
                    |    Dim_Book      |
                    +------------------+
                    | BookKey (PK)     |
                    | BookID           |
                    | ISBN             |
                    | Title            |
                    | Author           |
                    | PublicationYear  |
                    +------------------+
                              |
                              |
                              |
                              v

+------------------+    +------------------+    +------------------+
|  Dim_Customer    |--->|    Fact_Loan     |<---|    Dim_Date      |
+------------------+    +------------------+    +------------------+
| CustomerKey(PK)  |    | LoanKey          |    | DateKey (PK)     |
| CustomerID       |    | BookKey (FK)     |    | Date             |
| FirstName        |    | CustomerKey(FK)  |    | Year             |
| LastName         |    | DateKey (FK)     |    | Quarter          |
| City             |    | LoanCount        |    | Month            |
| CustomerSince    |    | LoanDurationDays |    | MonthName        |
+------------------+    +------------------+    | Week             |
                                                 | Day              |
                                                 | Weekday          |
                                                 +------------------+