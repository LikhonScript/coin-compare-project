import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
import os

# Load the data from the CSV file
# Get the absolute file path to the CSV file
csv_file_path = os.path.join(os.path.dirname(__file__), "ApeCoin.csv")

df = pd.read_csv(csv_file_path)

# Clean and transform the data
df["Price"] = (df["High"] + df["Low"]) / 2
data = df[["Date", "Open", "High", "Low", "Close", "Volume", "Price"]]
data.dropna(inplace=True)

# Create features and target variables
X = data.iloc[:, 1:]  # Exclude the 'Date' column from features
y = data.iloc[:, 1:]  # Predict all variables

# Train the linear regression model
model = LinearRegression()
model.fit(X, y)

# Retrieve the last available data point
last_data_point = X.iloc[-1].values.reshape(1, -1)

# Create an array for the next 6 days' predictions
predictions = []

# Generate predictions for the next 6 days
for _ in range(6):
    next_day_prediction = model.predict(last_data_point)
    predictions.append(next_day_prediction[0])
    last_data_point = np.concatenate(
        (last_data_point[:, 1:], next_day_prediction[:, -1].reshape(1, -1)), axis=1
    )
    predictions

# Convert predictions into a dataframe
# Convert predictions into a DataFrame
predictions_df = pd.DataFrame(predictions, columns=data.columns[1:])

# Adjust printing options for numpy


# Output the predictions for the next 6 days with formatted spacing
print(predictions_df)


# Write JSON object to a file
