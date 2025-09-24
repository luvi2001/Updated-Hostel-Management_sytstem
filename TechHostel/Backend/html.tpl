<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Trivy Vulnerability Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
    th, td { border: 1px solid #ddd; padding: 8px; }
    th { background-color: #f2f2f2; text-align: left; }
    tr:nth-child(even) { background-color: #f9f9f9; }
    .high { color: red; font-weight: bold; }
    .medium { color: orange; }
    .low { color: green; }
  </style>
</head>
<body>
  <h1>Trivy Vulnerability Report</h1>

  {{- range . }}
    <h2>Target: {{ .Target }}</h2>
    {{- if .Vulnerabilities }}
      <table>
        <tr>
          <th>Package</th>
          <th>Version</th>
          <th>Vulnerability ID</th>
          <th>Severity</th>
          <th>Title</th>
          <th>Fixed Version</th>
        </tr>
        {{- range .Vulnerabilities }}
        <tr>
          <td>{{ .PkgName }}</td>
          <td>{{ .InstalledVersion }}</td>
          <td><a href="https://avd.aquasec.com/nvd/{{ .VulnerabilityID }}" target="_blank">{{ .VulnerabilityID }}</a></td>
          <td class="{{ lower .Severity }}">{{ .Severity }}</td>
          <td>{{ .Title }}</td>
          <td>{{ .FixedVersion }}</td>
        </tr>
        {{- end }}
      </table>
    {{- else }}
      <p>No vulnerabilities found 🎉</p>
    {{- end }}
  {{- end }}
</body>
</html>
