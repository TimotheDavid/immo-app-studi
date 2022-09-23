interface errorConfigI {
  severity: "success" | "info" | "error";
  summary: string;
  life: number | 30000;
}

class ErrorConfig {
  private base: string;
  private LIFE = 3000;

  constructor(base: string) {
    this.base = base;
  }

  get saveSuccess(): errorConfigI {
    return {
      life: this.LIFE,
      severity: "success",
      summary: `${this.toUppercase()} crée avec succès`,
    };
  }

  get saveError(): errorConfigI {
    return {
      life: this.LIFE,
      severity: "success",
      summary: `impossible de crée l'${this.base}`,
    };
  }

  get deleteSucess(): errorConfigI {
    return {
      life: this.LIFE,
      severity: "success",
      summary: `${this.toUppercase()} enlever avec succès `,
    };
  }

  get deleteError(): errorConfigI {
    return {
      life: this.LIFE,
      severity: "error",
      summary: `impossible d'enlever ${this.base}`,
    };
  }

  get updateSucess(): errorConfigI {
    return {
      life: this.LIFE,
      severity: "success",
      summary: `${this.toUppercase()} modifier avec succès `,
    };
  }

  get updateError(): errorConfigI {
    return {
      life: this.LIFE,
      severity: "error",
      summary: `impossible de modifier ${this.base}`,
    };
  }

  private toUppercase(): string {
    return this.base.charAt(0).toUpperCase() + this.base.slice(1);
  }
}

export default ErrorConfig;
