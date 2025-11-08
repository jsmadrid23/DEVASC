/**
 * Converts IP info object to CSV format and triggers download
 * @param {Object} ipInfo - The IP information object to export
 */
export const exportToCSV = (ipInfo) => {
  if (!ipInfo) return;

  // Create CSV headers and values
  const headers = Object.keys(ipInfo);
  const values = Object.values(ipInfo).map(val => {
    // Escape values that contain commas, quotes, or newlines
    if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  });

  // Create CSV content
  const csvHeaders = headers.join(',');
  const csvValues = values.join(',');
  const csvContent = `${csvHeaders}\n${csvValues}`;

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  // Generate filename with timestamp
  const timestamp = new Date().toISOString().slice(0, 10);
  const fileName = `ip-info_${ipInfo.resolved_ip || ipInfo.input}_${timestamp}.csv`;
  
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
