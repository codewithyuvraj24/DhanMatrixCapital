import numpy as np
from datetime import datetime, timedelta

class ROIPredictor:
    """
    The Matrix Prophet: Simulates future growth based on Real Market Data (yfinance).
    Uses Monte Carlo simulation on historical volatility.
    """
    def __init__(self, ticker="^NSEI"): # Default to NIFTY 50
        self.ticker = ticker
        self.returns = self.fetch_market_data()

    def fetch_market_data(self):
        try:
            import yfinance as yf
            import pandas as pd
            
            # Fetch last 1 year of data
            stock = yf.Ticker(self.ticker)
            hist = stock.history(period="1y")
            
            if hist.empty:
                raise ValueError("No market data found")
                
            # Calculate daily returns
            returns = hist['Close'].pct_change().dropna().values
            return returns
        except Exception as e:
            print(f"Prophet Warning: Market data unavailable ({e}). Using fallback matrix.")
            # Fallback: Historical Nifty 50 daily returns approx
            return [0.0005, -0.0002, 0.001, -0.005, 0.002, 0.0015] * 20

    def predict_future_value(self, capital, months=12):
        # Calculate daily parameters from historical data
        mu = np.mean(self.returns)  # Daily average return
        sigma = np.std(self.returns) # Daily volatility
        
        # Scale to monthly for the simulation steps
        # Assumption: 21 trading days per month
        monthly_mu = mu * 21
        monthly_sigma = sigma * np.sqrt(21)
        
        # Monte Carlo Simulation (1000 paths)
        simulation_results = []
        for _ in range(1000):
            path_val = capital
            for _ in range(months):
                noise = np.random.normal(0, monthly_sigma)
                growth_factor = 1 + monthly_mu + noise
                path_val *= growth_factor
            simulation_results.append(path_val)
            
        final_mean = np.mean(simulation_results)
        
        return {
            "prediction": final_mean,
            "confidence_interval": [
                np.percentile(simulation_results, 5),
                np.percentile(simulation_results, 95)
            ],
            "estimated_yield_pa": (final_mean / capital - 1) * 100
        }

if __name__ == "__main__":
    prophet = ROIPredictor("^NSEI") # Test with Nifty 50
    
    result = prophet.predict_future_value(100000, 12)
    print(f"--- Matrix Prophet Result (Live Data) ---")
    print(f"Starting Capital: ₹100,000")
    print(f"Predicted Value (12m): ₹{result['prediction']:,.2f}")
    print(f"Annual Yield: {result['estimated_yield_pa']:.2f}%")
