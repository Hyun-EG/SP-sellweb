export default function Table({
  headers,
  rows,
}: {
  headers: { label: string; width: string }[];
  rows: string[][];
}) {
  return (
    <div className="w-[1200px] h-screen flex flex-col">
      <div className="w-[1200px] h-[100px] flex border-b border-[#afafaf] bg-[#f4f4f4]">
        {headers.map((header, index) => (
          <div
            key={index}
            className={`flex justify-center items-center ${index !== headers.length - 1 ? 'border-r border-[#afafaf]' : ''}`}
            style={{ width: header.width }}
          >
            {header.label}
          </div>
        ))}
      </div>

      {rows.map((row, index) => (
        <div key={index} className="h-[80px] flex border-b border-[#afafaf]">
          {row.map((cell, index) => (
            <div
              key={index}
              className="flex justify-center items-center"
              style={{ width: headers[index]?.width }}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
