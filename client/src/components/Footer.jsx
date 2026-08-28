export default function Footer({ className = "" }) {
  return (
    <footer className={`text-[15px] leading-7 text-neutral-600 ${className}`}>
      <p>
        Car Insur is a trading name of Atlanta Insurance Intermediaries Limited. Authorised and Regulated by
        the Financial Conduct Authority under firm reference number 309599. Company registration number: 756681.
        Registered address:{" "}
        <span className="text-neutral-700">
          Embankment West Tower, 101 Cathedral Approach, Salford, M3 7FB
        </span>
        .
      </p>
      <p className="mt-6">
        Atlanta Insurance Intermediaries Limited can be found on the{" "}
        <span className="text-neutral-700">Financial Services Register</span>{" "}
        under reference number 309599. For more information please{" "}
        <span className="text-neutral-700">contact us</span>
        .
      </p>
      <p className="mt-6">Calls are recorded for training and quality purposes.</p>
      <span className="mt-6 inline-block text-neutral-700">Privacy Policy</span>
    </footer>
  );
}
