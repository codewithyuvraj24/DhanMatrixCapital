import numpy as np
from datetime import datetime, timedelta

class ROIPredictor:
    """
    The Matrix Prophet: Simulates future growth based on historical trends.
    In a real scenario, this would use TensorFlow or Scikit-Learn.
    """
    def __init__(self, historical_returns):
        self.returns = historical_returns

    def predict_future_value(self, capital, months=12):
        # Calculate daily trend and volatility
        avg_monthly_return = np.mean(self.returns)
        volatility = np.std(self.returns)
        
        # Monte Carlo Simulation (1000 paths)
        simulation_results = []
        for _ in range(1000):
            path_val = capital
            for _ in range(months):
                noise = np.random.normal(0, volatility)
                path_val *= (1 + (avg_monthly_return + noise))
            simulation_results.append(path_val)
            
        return {
            "prediction": np.mean(simulation_results),
            "confidence_interval": [
                np.percentile(simulation_results, 5),
                np.percentile(simulation_results, 95)
            ],
            "estimated_yield_pa": (np.mean(simulation_results) / capital - 1) * 100
        }

if __name__ == "__main__":
    # Sample returns of Growth Plan (approx 15% per month)
    sample_data = [0.12, 0.15, 0.18, 0.14, 0.16]
    prophet = ROIPredictor(sample_data)
    
    result = prophet.predict_future_value(100000, 12)
    print(f"--- Matrix Prophet Result ---")
    print(f"Starting Capital: ₹100,000")
    print(f"Predicted Value (12m): ₹{result['prediction']:,.2f}")
    print(f"Annual Yield: {result['estimated_yield_pa']:.2f}%")
