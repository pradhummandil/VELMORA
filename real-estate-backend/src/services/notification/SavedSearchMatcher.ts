import { Property } from "../../models/Property";
import { SavedSearch } from "../../models/SavedSearch";
import { User } from "../../models/User";

export class SavedSearchMatcher {
  /**
   * Evaluate a newly listed property against active saved searches
   */
  static async evaluateNewProperty(property: Property): Promise<void> {
    try {
      const activeSearches = await SavedSearch.findAll({
        where: { alertEnabled: true },
        include: [{ model: User, as: "user", attributes: ["id", "email", "name", "firstName"] }],
      });

      for (const savedSearch of activeSearches) {
        const criteria = savedSearch.criteria || {};
        const isMatch = this.checkCriteriaMatch(property, criteria);

        if (isMatch) {
          // Log alert dispatch
          console.log(
            `[Notification] Saved Search Match: Property ${property.id} (${property.title}) matched search "${savedSearch.name}" for User ${savedSearch.userId}`
          );

          await savedSearch.update({ lastNotifiedAt: new Date() });
        }
      }
    } catch (error: any) {
      console.warn("Saved search alert evaluation notice:", error.message);
    }
  }

  private static checkCriteriaMatch(property: Property, criteria: Record<string, any>): boolean {
    // 1. City Match
    if (criteria.city && typeof criteria.city === "string" && criteria.city.trim().length > 0) {
      const pCity = (property.city || "").toLowerCase();
      if (!pCity.includes(criteria.city.toLowerCase().trim())) {
        return false;
      }
    }

    // 2. Locality Match
    if (criteria.locality && typeof criteria.locality === "string" && criteria.locality.trim().length > 0) {
      const pLoc = (property.locality || "").toLowerCase();
      if (!pLoc.includes(criteria.locality.toLowerCase().trim())) {
        return false;
      }
    }

    // 3. Price Bounds
    const price = Number(property.price);
    if (price && !isNaN(price)) {
      if (criteria.minPrice && price < Number(criteria.minPrice)) return false;
      if (criteria.maxPrice && price > Number(criteria.maxPrice)) return false;
    }

    // 4. BHK Match
    if (criteria.bhk && property.bedrooms) {
      const desiredBhks = Array.isArray(criteria.bhk)
        ? criteria.bhk.map(String)
        : [String(criteria.bhk)];
      if (!desiredBhks.includes(String(property.bedrooms))) {
        return false;
      }
    }

    // 5. Property Type Match
    if (criteria.propertyType && property.propertyType) {
      const pType = property.propertyType.toLowerCase();
      const desiredTypes = Array.isArray(criteria.propertyType)
        ? criteria.propertyType.map((t: string) => t.toLowerCase())
        : [String(criteria.propertyType).toLowerCase()];
      if (!desiredTypes.some((t) => pType.includes(t))) {
        return false;
      }
    }

    // 6. RERA Only Filter
    if (criteria.reraOnly && property.reraStatus !== "verified") {
      return false;
    }

    return true;
  }
}
