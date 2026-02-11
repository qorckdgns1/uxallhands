export default function WeatherDetail({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4">
      <p className="text-xs text-gray-600 font-medium mb-1">
        {icon} {title}
      </p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
